import { Router } from 'express';
import {
  createHall,
  getAllHalls,
  getHallById,
  updateHall,
  deleteHall,
  retrieveHall,
  eraseHall,
} from '../controllers/hall.controller.ts';

import { authMiddleware } from '@core/middlewares/auth.middleware.js';
import { accessControl } from '@core/middlewares/access.middleware.js';
import { requirePermission } from '@core/middlewares/require-permission.middleware.js';
import { zodValidate } from '@core/middlewares/zod.validator.js';
// import { HallSchema } from "@api/validators/event-hall.validator.ts";

const router = Router();

// router.use(authMiddleware);
// router.use(accessControl);

router.post('/', createHall);

router.get('/', getAllHalls);

router.get('/:id', getHallById);

router.put('/:id', updateHall);

router.delete('/:id', deleteHall);

router.put('/:id/retrieve', retrieveHall);

router.delete('/:id/erase', eraseHall);

export default router;
