import { Request, Response } from "express";
import sendResponse from "./responseWrapper.js";

/**
 * Creates reusable status controllers
 * Works with services having:
 *  - remove(id)
 *  - retrieve(id)
 *  - setActiveStatus(id, active)
 */
export const createStatusControllers = (
  service: any,
  model: string
) => {
  return {
    /**
     * SOFT DELETE
     */
    softDelete: async (req: Request, res: Response) => {
      const result = await service.remove(req.params.id);

      if (!result) {
        return sendResponse.notFound(res, model);
      }

      return sendResponse.deleted(res, model);
    },

    /**
     * RETRIEVE (UNDO DELETE)
     */
    retrieve: async (req: Request, res: Response) => {
      const result = await service.retrieve(req.params.id);

      if (!result) {
        return sendResponse.notFound(res, model);
      }

      return sendResponse.retrieved(res, model, result);
    },

    /**
     * SET ACTIVE / INACTIVE
     */
    setActiveStatus: async (req: Request, res: Response) => {
      const { active } = req.body;

      const result = await service.setActiveStatus(
        req.params.id,
        active
      );

      if (!result) {
        return sendResponse.notFound(res, model);
      }

      return sendResponse.updated(res, model, result);
    },
  };
};
