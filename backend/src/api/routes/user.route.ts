import { Router } from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  retrieveUser,
  eraseUser,
} from '../controllers/user.controller.ts';

import { authMiddleware } from '@core/middlewares/auth.middleware.js';
import { accessControl } from '@core/middlewares/access.middleware.js';
import { requirePermission } from '@core/middlewares/require-permission.middleware.js';
import { zodValidate } from '@core/middlewares/zod.validator.js';
// import { UserSchema } from "@api/validators/event-hall.validator.ts";

const router = Router();

// router.use(authMiddleware);
// router.use(accessControl);

router.post('/', createUser);

router.get('/', getAllUsers);

router.get('/:id', getUserById);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

router.put('/:id/retrieve', retrieveUser);

router.delete('/:id/erase', eraseUser);

export default router;
