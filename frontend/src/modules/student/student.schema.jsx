// student.schema.ts
import { z } from "zod";

export const studentSchema = z.object({
  registerNumber: z
    .string()
    .min(5, { message: "Register number is too short" })
    .max(20, { message: "Register number is too long" })
    .regex(/^[A-Za-z0-9]+$/, {
      message: "Register number can only contain letters and numbers",
    }),

  name: z
    .string()
    .min(2, { message: "Please enter student's full name" })
    .max(100, { message: "Name is too long" })
    .trim(),

  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .min(1, { message: "Email is required" }),

  contact: z
    .string()
    .min(10, { message: "Contact number must be at least 10 digits" })
    .max(15, { message: "Contact number is too long" })
    .regex(/^[0-9+\-\s()]+$/, {
      message: "Contact number can only contain numbers, +, -, spaces, and parentheses",
    }),

  department: z
    .string()
    .min(1, { message: "Please select a department" }),

  course: z
    .string()
    .min(1, { message: "Please select a course/program" }),

  year: z
    .number()
    .int({ message: "Year must be a whole number" })
    .min(1, { message: "Year must be between 1 and 4" })
    .max(4, { message: "Year must be between 1 and 4" }),

  // Optional: Include password only for CREATE operation
  // You can handle it conditionally in your form logic
  password: z
    .string()
    .optional()
    .refine(
      (val) => {
        // Only require if it's a new student (create)
        // Usually handled in form component or by separate create schema
        return true; // or implement min length etc. if needed
      },
      { message: "Password is required for new students" }
    )
    .refine((val) => !val || val.length >= 8, {
      message: "Password must be at least 8 characters",
    }),
});

// Optional: Separate schema for create (with password required)
export const createStudentSchema = studentSchema.extend({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(100, { message: "Password is too long" }),
});

// Optional: Update schema (password optional)
export const updateStudentSchema = studentSchema.partial().omit({
  registerNumber: true, // usually shouldn't allow changing reg number
});