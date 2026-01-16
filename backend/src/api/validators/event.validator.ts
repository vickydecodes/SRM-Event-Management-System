import { z } from "zod";

export const eventHallSchema = z.object({
  name: z.string().min(2).max(100),
  code: z.string().min(2).max(10).toUpperCase(),
  capacity: z.number().int().positive(),
  allowedDepartments: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
});
