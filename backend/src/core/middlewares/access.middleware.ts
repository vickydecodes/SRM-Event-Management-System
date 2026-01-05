import { Request, Response, NextFunction, RequestHandler } from "express";

export interface AccessRequest extends Request {
  user?: any;
  role?: string;
  queryFilter?: Record<string, any>;
}

export const accessControl: RequestHandler = (
  req: AccessRequest,
  res: Response,
  next: NextFunction
) => {
  req.queryFilter = {};

  if (req.role === "ADMIN") {
    return next();
  }

  if (req.role === "DEPARTMENT" && req.user?.departmentId) {
    req.queryFilter.departmentId = req.user.departmentId;
  }

  if (req.role === "STUDENT" && req.user?._id) {
    req.queryFilter.studentId = req.user._id;
  }

  next();
};
