import { ZodError } from "zod";

export type CreateReturn = {
  status: boolean;
  data: { messageId: string };
  errors: ZodError | null;
};
