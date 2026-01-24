import { z } from "zod";

export const staffSchema = z.object({
    name: z
        .string()
        .min(2, { error: "Please enter the board name" }),

    email: z
        .email({ error: "Please enter a valid email address" })
        .min(1, { error: "Please enter the board email" }),
    role: z.string().min(1, { error: "Please specify the role" }).default("staff"),
    department: z.string().min(1, { error: "Please specify the department of the staff" })
});
