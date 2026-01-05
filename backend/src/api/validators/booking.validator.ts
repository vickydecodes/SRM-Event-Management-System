import { z } from "zod";

export const bookingSchema = z.object({
  hallId: z.string(),
  departmentId: z.string(),
  eventName: z.string().min(2),
  fromDate: z.string(),
  toDate: z.string(),
  fromTime: z.string(),
  toTime: z.string(),
  inchargeName: z.string(),
  inchargePhone: z.string().regex(/^[0-9]{10}$/),
  inchargeEmail: z.string().email(),
});
