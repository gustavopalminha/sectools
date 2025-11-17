import { ZodError } from "zod";

export type Message = {
  id: string;
  createdAt: Date;
  body: string;
  minutesToExpire: number;
  nextVisit: boolean;
};

export type CreateReturn = {
  status: boolean;
  data: { messageId: string };
  errors: ZodError | null;
};
