"use server";

import { inputSchema } from "@/validators/schemas";
import { CreateReturn } from "./message.types";
import { encrypt, decrypt } from "@/lib/cypher";
import prisma from "@/lib/db";

import { logger } from "@/lib/logger";
const actionLogger = logger.child({ module: "action-messages" });

const createMessage = async (
  prevState: CreateReturn | undefined | null,
  formData: FormData
): Promise<CreateReturn> => {
  const data = Object.fromEntries(formData);
  const validateMessage = inputSchema.safeParse(data);

  if (!validateMessage.success) {
    actionLogger.error("ERROR", validateMessage.error);

    return {
      status: false,
      data: { messageId: "" },
      errors: validateMessage.error,
    };
  }

  const message = await prisma.message.create({
    data: {
      body: encrypt(validateMessage.data.message),
      minutesToExpire: Number(validateMessage.data.minutes),
      nextVisit: validateMessage.data.deleteNext,
    },
  });

  return { status: true, data: { messageId: message.id }, errors: null };
};

const getMessage = async (id: string) => {
  actionLogger.info(`GET MESSAGE WITH ID ${id}`);

  const message = await prisma.message.findUnique({ where: { id: id } });

  if (!message) {
    return null;
  }

  const now = new Date();

  const differenceMilliseconds = now.getTime() - message.createdAt.getTime();
  const differenceMinutes = Math.round(differenceMilliseconds / 1000 / 60);

  const shouldNotReturn = differenceMinutes > message.minutesToExpire;
  const shouldBeDeleted =
    differenceMinutes > message.minutesToExpire || message.nextVisit;

  if (shouldBeDeleted) {
    actionLogger.info(`AND WAS EXPIRED SO WAS DELETED`);
    deleteMessage(id);
  }

  if (shouldNotReturn) {
    actionLogger.info(`BUT NOT RETURNED TO UI`);
    return null;
  }

  message.body = decrypt(message.body);
  return message;
};

const deleteMessage = async (id: string) => {
  actionLogger.info(`DELETE MESSAGE WITH ID ${id}`);
  return await prisma.message.delete({ where: { id: id } });
};

const deleteOlderMessages = async (reference: Date) => {
  actionLogger.info(
    `DELETE OLDER MESSAGES WITH CREATED DATE LOWER THAN ${reference.toDateString()}`
  );

  const messages = await prisma.message.findMany({
    where: { createdAt: { lt: reference } },
  });

  type TMessage = {
    id: string;
    createdAt: Date;
    body: string;
    minutesToExpire: number;
    nextVisit: boolean;
  };

  const ids = messages.map((message: TMessage) => message.id);

  return await prisma.message.deleteMany({ where: { id: { in: ids } } });
};

export { createMessage, getMessage, deleteMessage, deleteOlderMessages };
