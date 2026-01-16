// core/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import sendResponse from '@core/constants/responsewrapper.core.js';

export interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies?.access_token;

  if (!token) {
    return sendResponse.unauthorized(res, 'Unauthenticated');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('❌ Invalid Token:', err);
    return sendResponse.unauthorized(res, 'Invalid or expired token');
  }
};
