import { Request, Response } from "express";
import sendResponse from "@core/constants/responsewrapper.core.ts";
import { wrapControllers } from "@core/constants/wrapcontrollers.core.ts";
import * as service from "@core/services/enrollment.services.js";
import { AccessRequest } from "@core/middlewares/access.middleware.js";
import { buildQuery } from "@core/constants/querybuilder.core.js";

const controllers = {
  createEnrollment: async (req: Request, res: Response) => {
    const enrollment = await service.create(req.body);
    return sendResponse.created(res, "enrollment", enrollment);
  },

  getAllEnrollments: async (req: AccessRequest, res: Response) => {
    const queries = buildQuery(req);

    // ✅ ONLY ONE ARGUMENT
    const enrollments = await service.getAll(queries);

    return sendResponse.paginated(res, "enrollment", enrollments);
  },

  getEnrollmentById: async (req: Request, res: Response) => {
    const enrollment = await service.getById(req.params.id);
    if (!enrollment) return sendResponse.notFound(res, "enrollment");
    return sendResponse.fetched(res, "enrollment", enrollment);
  },

  deleteEnrollment: async (req: Request, res: Response) => {
    const enrollment = await service.remove(req.params.id);
    if (!enrollment) return sendResponse.notFound(res, "enrollment");
    return sendResponse.deleted(res, "enrollment");
  },
};

export const {
  createEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  deleteEnrollment,
} = wrapControllers(controllers);
