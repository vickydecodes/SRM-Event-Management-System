import sendResponse from '@core/constants/responsewrapper.core.ts';
import { Response, Request } from 'express';

export const createStatusControllers = (service: any, entityName: string) => {
  return {
    softDelete: async (req: Request, res: Response) => {
      const item = await service.remove(req.params.id);
      if (!item) return sendResponse.notFound(res, entityName);

      return sendResponse.deleted(res, entityName);
    },

    setActiveStatus: async (req: Request, res: Response) => {
      const { active } = req.body;

      const item = await service.setActiveStatus(req.params.id, active);
      if (!item) return sendResponse.notFound(res, entityName);

      return sendResponse.updated(res, entityName, item);
    },

    retrieve: async (req: Request, res: Response) => {
      const item = await service.retrieve(req.params.id);
      if (!item) return sendResponse.notFound(res, entityName);
      return sendResponse.retrieved(res, entityName);
    },
  };
};
