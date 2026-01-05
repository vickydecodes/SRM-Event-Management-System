import { Router } from "express";
import {
  createEventHall,
  getAllEventHalls,
  getEventHallById,
  updateEventHall,
  deleteEventHall,
  setEventHallActiveStatus,
  retrieveEventHall,
  eraseEventHall,
} from "../controllers/event-hall.controller.js";

import { authMiddleware } from "@core/middlewares/auth.middleware.js";
import { accessControl } from "@core/middlewares/access.middleware.js";
import { requirePermission } from "@core/middlewares/require-permission.middleware.js";
import { zodValidate } from "@core/middlewares/zod.validator.js";
import { eventHallSchema } from "@api/validators/event-hall.validator.ts";

const router = Router();

router.use(authMiddleware);
router.use(accessControl);

router.post(
  "/",
  zodValidate(eventHallSchema),
  requirePermission("eventHall", "create"),
  createEventHall
);

router.get(
  "/",
  requirePermission("eventHall", "view"),
  getAllEventHalls
);

router.get(
  "/:id",
  requirePermission("eventHall", "view"),
  getEventHallById
);

router.put(
  "/:id",
  zodValidate(eventHallSchema.partial()),
  requirePermission("eventHall", "update"),
  updateEventHall
);

router.delete(
  "/:id",
  requirePermission("eventHall", "delete"),
  deleteEventHall
);

router.patch(
  "/:id/active-status",
  requirePermission("eventHall", "update"),
  setEventHallActiveStatus
);

router.put(
  "/:id/retrieve",
  requirePermission("eventHall", "retrieve"),
  retrieveEventHall
);

router.delete(
  "/:id/erase",
  requirePermission("eventHall", "delete"),
  eraseEventHall
);

export default router;
