import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import sendResponse from "@core/constants/responseWrapper.js";

export const zodValidate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      const message =
        error?.errors?.[0]?.message || "Validation failed";
      return sendResponse.validationError(res, message);
    }
  };
