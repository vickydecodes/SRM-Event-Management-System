import { Router } from 'express';
import {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
  eraseDepartment,
  retrieveDepartment,
} from '../controllers/department.controller.js';

import { authMiddleware } from '@core/middlewares/auth.middleware.js';
import { accessControl } from '@core/middlewares/access.middleware.js';
import { requirePermission } from '@core/middlewares/require-permission.middleware.js';
import { zodValidate } from '@core/middlewares/zod.validator.js';
import { departmentSchema } from '@api/validators/department.validator.ts';

const router = Router();

// router.use(authMiddleware);
// router.use(accessControl);

router.post('/', createDepartment);

router.get('/', getAllDepartments);

router.get('/:id', getDepartmentById);

router.put('/:id', updateDepartment);

router.delete('/:id', deleteDepartment);

router.delete('/:id/erase', eraseDepartment);

router.put('/:id/retrieve', retrieveDepartment);

export default router;
