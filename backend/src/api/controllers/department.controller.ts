import { NextFunction, Request, Response } from "express";
import sendResponse from "@core/constants/responseWrapper.js";
import { wrapControllers } from "@core/constants/wrapControllers.js";
import * as service from "@core/services/department.services.js";
import { createStatusControllers } from "@core/constants/createStatusControllers.js";
import { AccessRequest } from "@core/middlewares/access.middleware.js";
import { buildQuery } from "@core/constants/queryBuilder.js";

const status = createStatusControllers(service, "department");

const controllers = {
  createDepartment: async (req: Request, res: Response, next: NextFunction) => {
    const department = await service.create(req.body);
    return sendResponse.created(res, "department", department);
  },

  getAllDepartments: async (
    req: AccessRequest,
    res: Response,
    next: NextFunction
  ) => {
    const queries = buildQuery(req);
    const departments = await service.getAll(queries, req.role);
    return sendResponse.paginated(res, "department", departments);
  },

  getDepartmentById: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const department = await service.getById(req.params.id);
    if (!department)
      return sendResponse.notFound(res, "department");
    return sendResponse.fetched(res, "department", department);
  },

  updateDepartment: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const department = await service.update(req.params.id, req.body);
    if (!department)
      return sendResponse.notFound(res, "department");
    return sendResponse.updated(res, "department", department);
  },

  deleteDepartment: status.softDelete,

  setDepartmentActiveStatus: status.setActiveStatus,

  eraseDepartment: async (req: Request, res: Response) => {
    const department = await service.erase(req.params.id);
    if (!department)
      return sendResponse.notFound(res, "department");
    return sendResponse.deleted(res, "department");
  },

  retrieveDepartment: status.retrieve,
};

export const {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
  setDepartmentActiveStatus,
  eraseDepartment,
  retrieveDepartment,
} = wrapControllers(controllers);
