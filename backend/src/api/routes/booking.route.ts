import { Router } from "express";
import {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  retrieveBooking,
  setBookingActiveStatus,
  eraseBooking,
  approveBooking,
  rejectBooking,
} from "../controllers/booking.controller.js";

import { authMiddleware } from "@core/middlewares/auth.middleware.js";
import { accessControl } from "@core/middlewares/access.middleware.js";
import { requirePermission } from "@core/middlewares/require-permission.middleware.js";
import { zodValidate } from "@core/middlewares/zod.validator.js";
import { bookingSchema } from "@api/validators/booking.validator.ts";

const router = Router();

router.use(authMiddleware);
router.use(accessControl);

router.post(
  "/",
  zodValidate(bookingSchema),
  requirePermission("booking", "create"),
  createBooking
);

router.get(
  "/",
  requirePermission("booking", "view"),
  getAllBookings
);

router.get(
  "/:id",
  requirePermission("booking", "view"),
  getBookingById
);

router.put(
  "/:id",
  zodValidate(bookingSchema.partial()),
  requirePermission("booking", "update"),
  updateBooking
);

router.delete(
  "/:id",
  requirePermission("booking", "delete"),
  deleteBooking
);

router.patch(
  "/:id/active-status",
  requirePermission("booking", "update"),
  setBookingActiveStatus
);

router.put(
  "/:id/retrieve",
  requirePermission("booking", "retrieve"),
  retrieveBooking
);

router.delete(
  "/:id/erase",
  requirePermission("booking", "delete"),
  eraseBooking
);

/* ---------------- ADMIN ACTIONS ---------------- */

router.patch(
  "/:id/approve",
  requirePermission("booking", "update"),
  approveBooking
);

router.patch(
  "/:id/reject",
  requirePermission("booking", "update"),
  rejectBooking
);

export default router;
