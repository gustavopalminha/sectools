import { z } from "zod";

export const inputSchema = z.object({
  message: z.string(),
  minutes: z.string(),
  deleteNext: z.coerce.boolean(),
});
