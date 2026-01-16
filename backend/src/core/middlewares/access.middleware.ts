// core/middlewares/access.middleware.ts
import { Request, Response, NextFunction } from "express";
import sendResponse from "@core/constants/responsewrapper.core.js";

export interface AccessRequest extends Request {
  user?: any;
  role?: string;
  branchId?: string;
  permissions?: Record<string, any>;
  queryFilter?: Record<string, any>;
  can?: (action: string, module: string) => boolean;
}

export function accessControl(
  req: AccessRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user) {
      req.queryFilter = {};
      return next();
    }

    // extract from token
    const user = req.user;
    req.role = user.role;
    req.branchId = user.branch || null;

    // transform permissions array into object
    req.permissions = {};
    if (Array.isArray(user.permissions)) {
      user.permissions.forEach((perm: any) => {
        const module = Object.keys(perm)[0];
        req.permissions![module] = perm[module];
      });
    }

    req.can = (action: string, module: string) => {
      if (req.role === "super_admin") return true;
      const mod = req.permissions?.[module];
      return mod?.[action] === true;
    };

    // branch filter logic
    req.queryFilter = {};

    if (["junior_admin", "teacher", "student"].includes(req.role!)) {
      req.queryFilter.branch = req.branchId;
    }

    next();
  } catch (error) {
    console.error("❌ AccessControl Error:", error);
    return sendResponse.error(res, "accessControl", error);
  }
}
