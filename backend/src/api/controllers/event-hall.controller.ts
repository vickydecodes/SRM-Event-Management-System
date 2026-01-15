import { NextFunction, Request, Response } from "express";
import sendResponse from "@core/constants/responsewrapper.core.ts";
import { wrapControllers } from "@core/constants/wrapcontrollers.core.ts";
import * as service from "@core/services/event-hall.services.js";
import { createStatusControllers } from "@core/constants/createstatus.core.ts";
import { AccessRequest } from "@core/middlewares/access.middleware.js";
import { buildQuery } from "@core/constants/querybuilder.core.js";

const status = createStatusControllers(service, "eventHall");

const controllers = {
  createEventHall: async (req: Request, res: Response) => {
    const hall = await service.create(req.body);
    return sendResponse.created(res, "eventHall", hall);
  },

  getAllEventHalls: async (req: AccessRequest, res: Response) => {
    const queries = buildQuery(req);
    const halls = await service.getAll(queries, req.role);
    return sendResponse.paginated(res, "eventHall", halls);
  },

  getEventHallById: async (req: Request, res: Response) => {
    const hall = await service.getById(req.params.id);
    if (!hall) return sendResponse.notFound(res, "eventHall");
    return sendResponse.fetched(res, "eventHall", hall);
  },

  updateEventHall: async (req: Request, res: Response) => {
    const hall = await service.update(req.params.id, req.body);
    if (!hall) return sendResponse.notFound(res, "eventHall");
    return sendResponse.updated(res, "eventHall", hall);
  },

  deleteEventHall: status.softDelete,
  setEventHallActiveStatus: status.setActiveStatus,
  retrieveEventHall: status.retrieve,

  eraseEventHall: async (req: Request, res: Response) => {
    const hall = await service.erase(req.params.id);
    if (!hall) return sendResponse.notFound(res, "eventHall");
    return sendResponse.deleted(res, "eventHall");
  },
};

export const {
  createEventHall,
  getAllEventHalls,
  getEventHallById,
  updateEventHall,
  deleteEventHall,
  setEventHallActiveStatus,
  retrieveEventHall,
  eraseEventHall,
} = wrapControllers(controllers);
