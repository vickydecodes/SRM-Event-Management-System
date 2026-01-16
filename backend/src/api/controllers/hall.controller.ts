import { Request, Response } from 'express';
import sendResponse from '@core/constants/responsewrapper.core.ts';
import * as service from '@core/services/hall.services.js';
import { createStatusControllers } from '@core/constants/createstatus.core.ts';
import { wrapControllers } from '@core/constants/wrapcontrollers.core.ts';
import { AccessRequest } from '@core/middlewares/access.middleware.js';
import { buildQuery } from '@core/constants/querybuilder.core.js';

const status = createStatusControllers(service, 'Hall');

const controllers = {
  createHall: async (req: Request, res: Response) => {
    const hall = await service.create(req.body);
    if (!hall) return sendResponse.badRequest(res, 'Hall');
    return sendResponse.created(res, 'Hall', hall);
  },

  getAllHalls: async (req: Request, res: Response) => {
    const halls = await service.getAll(req.query);
    return sendResponse.fetched(res, 'Hall', halls);
  },

  getHallById: async (req: Request, res: Response) => {
    const hall = await service.getById(req.params.id);
    if (!hall) return sendResponse.notFound(res, 'Hall');
    return sendResponse.fetched(res, 'Hall', hall);
  },

  updateHall: async (req: Request, res: Response) => {
    const hall = await service.update(req.params.id, req.body);
    if (!hall) return sendResponse.notFound(res, 'Hall');
    return sendResponse.updated(res, 'Hall', hall);
  },

  eraseHall: async (req: Request, res: Response) => {
    const hall = await service.erase(req.params.id);
    if (!hall) return sendResponse.notFound(res, 'Hall');
    return sendResponse.deleted(res, 'Hall');
  },

  deleteHall: status.softDelete,
  retrieveHall: status.retrieve,
};

export const {
  createHall,
  getAllHalls,
  getHallById,
  updateHall,
  deleteHall,
  retrieveHall,
  eraseHall,
} = wrapControllers(controllers);
