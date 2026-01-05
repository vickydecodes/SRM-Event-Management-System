import { Router } from "express";
import {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
  setDepartmentActiveStatus,
  eraseDepartment,
  retrieveDepartment,
} from "../controllers/department.controller.js";

import { authMiddleware } from "@core/middlewares/auth.middleware.js";
import { accessControl } from "@core/middlewares/access.middleware.js";
import { requirePermission } from "@core/middlewares/require-permission.middleware.js";
import { zodValidate } from "@core/middlewares/zod.validator.js";
import { departmentSchema } from "@api/validators/department.validator.ts";

const router = Router();

/**
 * ----------------------------------------
 * GLOBAL PROTECTION
 * ----------------------------------------
 */
router.use(authMiddleware);
router.use(accessControl);

/**
 * ----------------------------------------
 * DEPARTMENT MANAGEMENT ROUTES
 * ----------------------------------------
 */

// CREATE → department.create
router.post(
  "/",
  zodValidate(departmentSchema),
  requirePermission("department", "create"),
  createDepartment
);

// LIST → department.view
router.get(
  "/",
  requirePermission("department", "view"),
  getAllDepartments
);

// GET BY ID → department.view
router.get(
  "/:id",
  requirePermission("department", "view"),
  getDepartmentById
);

// UPDATE → department.update
router.put(
  "/:id",
  zodValidate(departmentSchema.partial()),
  requirePermission("department", "update"),
  updateDepartment
);

// SOFT DELETE → department.delete
router.delete(
  "/:id",
  requirePermission("department", "delete"),
  deleteDepartment
);

// SET ACTIVE STATUS
router.patch(
  "/:id/active-status",
  zodValidate(departmentSchema.partial()),
  requirePermission("department", "update"),
  setDepartmentActiveStatus
);

// HARD DELETE
router.delete(
  "/:id/erase",
  requirePermission("department", "delete"),
  eraseDepartment
);

// RETRIEVE
router.put(
  "/:id/retrieve",
  requirePermission("department", "retrieve"),
  retrieveDepartment
);

export default router;
