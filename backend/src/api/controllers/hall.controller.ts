import { Request, Response } from 'express';
import sendResponse from '@core/constants/responsewrapper.core.ts';
import * as service from '@core/services/hall.services.js';
import { createStatusControllers } from '@core/constants/createstatus.core.ts';
import { buildQuery } from '@core/constants/querybuilder.core.js';
import { wrapControllers } from '@core/constants/wrapcontrollers.core.ts';
import { AccessRequest } from '@core/middlewares/access.middleware.js';

const status = createStatusControllers(service, 'course');

const controllers = {
  createCourse: async (req: Request, res: Response) => {
    const course = await service.create(req.body);
    if (!course) return sendResponse.badRequest(res, 'Course');
    return sendResponse.created(res, 'Course', course);
  },

  getAllCourses: async (req: Request, res: Response) => {
    const courses = await service.getAll(req.query);
    return sendResponse.fetched(res, 'Course', courses);
  },

  getCourseById: async (req: Request, res: Response) => {
    const course = await service.getById(req.params.id);
    if (!course) return sendResponse.notFound(res, 'Course');
    return sendResponse.fetched(res, 'Course', course);
  },

  updateCourse: async (req: Request, res: Response) => {
    const course = await service.update(req.params.id, req.body);
    if (!course) return sendResponse.notFound(res, 'Course');
    return sendResponse.updated(res, 'Course', course);
  },

  deleteCourse: status.softDelete,
  retrieveCourse: status.retrieve,

  eraseCourse: async (req: Request, res: Response) => {
    const course = await service.erase(req.params.id);
    if (!course) return sendResponse.notFound(res, 'Course');
    return sendResponse.deleted(res, 'Course');
  },
};

export const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  retrieveCourse,
  eraseCourse,
} = wrapControllers(controllers);
