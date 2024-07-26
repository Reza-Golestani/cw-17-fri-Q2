import { z } from "zod";

export const usersSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(2),
  gender: z.number(),
  age: z.number().max(99),
});
