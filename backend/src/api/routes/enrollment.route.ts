import { Router } from "express";
import {
  createEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  deleteEnrollment,
} from "../controllers/enrollment.controller.js";

import { authMiddleware } from "@core/middlewares/auth.middleware.js";
import { accessControl } from "@core/middlewares/access.middleware.js";
import { requirePermission } from "@core/middlewares/require-permission.middleware.js";

const router = Router();

router.use(authMiddleware);
router.use(accessControl);

router.post(
  "/",
  requirePermission("enrollment", "create"),
  createEnrollment
);

router.get(
  "/",
  requirePermission("enrollment", "view"),
  getAllEnrollments
);

router.get(
  "/:id",
  requirePermission("enrollment", "view"),
  getEnrollmentById
);

router.delete(
  "/:id",
  requirePermission("enrollment", "delete"),
  deleteEnrollment
);

export default router;
