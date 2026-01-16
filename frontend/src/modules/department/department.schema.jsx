import { z } from "zod";

export const departmentSchema = z.object({
  name: z
    .string()
    .min(2, { error: "Please enter the board name" }),

  description: z
    .string()
    .min(5, { error: "Please enter a description" }),

  email: z
    .email({ error: "Please enter a valid email address" })
    .min(1, { error: "Please enter the board email" }),
});
