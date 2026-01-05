import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import sendResponse from "@core/constants/responseWrapper.js";
import User from "@db/models/user.model.js";

export const authMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return sendResponse.unauthorized(res);
    }

    const token = authHeader.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    const user = await User.findById(decoded.userId);

    if (!user || user.deleted || !user.active) {
      return sendResponse.unauthorized(res);
    }

    // Attach to request
    req.user = user;
    req.role = user.role;

    next();
  } catch (err) {
    return sendResponse.unauthorized(res);
  }
};
