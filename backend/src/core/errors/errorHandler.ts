import { Request, Response, NextFunction } from "express";
import sendResponse from "@core/constants/responseWrapper.js";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  return sendResponse.error(res, "server", {
    message,
    code: status,
  });
};

export default errorHandler;
