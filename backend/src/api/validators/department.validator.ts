import { z } from "zod";

const phoneNumber = z
  .string()
  .trim()
  .regex(/^[0-9]{10}$/, "Contact number must be a valid 10-digit number");

export const departmentSchema = z.object({
  name: z.string().trim().min(2).max(100),
  code: z.string().trim().min(2).max(10).toUpperCase(),
  email: z.string().email(),
  contactNumber: phoneNumber.optional(),
});
