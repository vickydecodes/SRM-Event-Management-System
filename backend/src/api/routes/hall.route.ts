import { Router } from 'express';
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  retrieveCourse,
  eraseCourse,
} from '../controllers/course.controller.ts';

import { authMiddleware } from '@core/middlewares/auth.middleware.js';
import { accessControl } from '@core/middlewares/access.middleware.js';
import { requirePermission } from '@core/middlewares/require-permission.middleware.js';
import { zodValidate } from '@core/middlewares/zod.validator.js';
// import { CourseSchema } from "@api/validators/event-hall.validator.ts";

const router = Router();

// router.use(authMiddleware);
// router.use(accessControl);

router.post('/', createCourse);

router.get('/', getAllCourses);

router.get('/:id', getCourseById);

router.put('/:id', updateCourse);

router.delete('/:id', deleteCourse);

router.put('/:id/retrieve', retrieveCourse);

router.delete('/:id/erase', eraseCourse);

export default router;
