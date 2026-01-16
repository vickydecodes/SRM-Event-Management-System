import { Request, Response } from 'express';
import sendResponse from '@core/constants/responsewrapper.core.ts';
import * as service from '@core/services/user.services.js';
import { createStatusControllers } from '@core/constants/createstatus.core.ts';
import { wrapControllers } from '@core/constants/wrapcontrollers.core.ts';
import { AccessRequest } from '@core/middlewares/access.middleware.js';
import { buildQuery } from '@core/constants/querybuilder.core.js';

const status = createStatusControllers(service, 'User');

const controllers = {
  createUser: async (req: Request, res: Response) => {
    const user = await service.create(req.body);
    if (!user) return sendResponse.badRequest(res, 'User');
    return sendResponse.created(res, 'User', user);
  },

  getAllUsers: async (req: Request, res: Response) => {
    const users = await service.getAll(req.query);
    return sendResponse.fetched(res, 'User', users);
  },

  getUserById: async (req: Request, res: Response) => {
    const user = await service.getById(req.params.id);
    if (!user) return sendResponse.notFound(res, 'User');
    return sendResponse.fetched(res, 'User', user);
  },

  updateUser: async (req: Request, res: Response) => {
    const user = await service.update(req.params.id, req.body);
    if (!user) return sendResponse.notFound(res, 'User');
    return sendResponse.updated(res, 'User', user);
  },

  eraseUser: async (req: Request, res: Response) => {
    const user = await service.erase(req.params.id);
    if (!user) return sendResponse.notFound(res, 'User');
    return sendResponse.deleted(res, 'User');
  },

  deleteUser: status.softDelete,
  retrieveUser: status.retrieve,
};

export const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  retrieveUser,
  eraseUser,
} = wrapControllers(controllers);
