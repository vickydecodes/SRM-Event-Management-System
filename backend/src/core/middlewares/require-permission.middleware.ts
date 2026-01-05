import { Request, Response, NextFunction } from "express";
import permissions from "@config/permissions.config.js";
import sendResponse from "@core/constants/responseWrapper.js";

export const requirePermission =
  (module: string, action: string) =>
  (req: any, res: Response, next: NextFunction) => {
    const role = req.role;

    if (!role) {
      return sendResponse.unauthorized(res);
    }

    const allowedRoles =
    (permissions as Record<string, Record<string, string[]>>)?.[module]?.[action];


    if (!allowedRoles || !allowedRoles.includes(role)) {
      return sendResponse.forbidden(res);
    }

    next();
  };
