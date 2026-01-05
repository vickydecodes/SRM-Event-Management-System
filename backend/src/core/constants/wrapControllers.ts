import asyncHandler from "./asyncHandler.js";
import { RequestHandler } from "express";

export const wrapControllers = <
  T extends Record<string, RequestHandler>
>(
  controllers: T
) => {
  const wrapped = {} as Record<keyof T, RequestHandler>;

  for (const key in controllers) {
    wrapped[key] = asyncHandler(key, controllers[key]);
  }

  return wrapped;
};
