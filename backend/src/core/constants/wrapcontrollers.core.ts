import asyncHandler from "./asynchandler.core.ts";
import { Request, Response, NextFunction } from "express";


type ControllerFn = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export const wrapControllers = <T extends Record<string, ControllerFn>>(controllers: T) => {
  const wrapped = {} as Record<keyof T, ControllerFn>;
  for (const key in controllers) {
    wrapped[key] = asyncHandler(key, controllers[key]); // name first
  }
  return wrapped;
};
