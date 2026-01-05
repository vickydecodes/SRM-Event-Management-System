import { z } from "zod";

export const enrollmentSchema = z.object({
  bookingId: z
    .string()
    .trim()
    .min(1, "Booking ID is required"),

  studentId: z
    .string()
    .trim()
    .min(1, "Student ID is required"),
});
