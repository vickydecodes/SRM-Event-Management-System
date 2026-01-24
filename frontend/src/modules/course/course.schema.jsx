import { z } from "zod";

export const courseSchema = z.object({
    name: z
        .string()
        .min(2, { error: "Please enter the course name" }),

    code: z
        .string()
        .min(2, { error: "Please enter the course code" }),

    department: z.string().min(2, { error: "Please specify a department" }),

    description: z
        .string()
        .min(5, { error: "Please enter a description" }),

    duration: z
        .string()
        .min(0, { error: "Duration cannot be negative" })
});
