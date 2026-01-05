import { RequestHandler } from "express";

/**
 * Async-safe controller wrapper
 * Works with both sync and async controllers
 */
const asyncHandler =
  (name: string, fn: RequestHandler): RequestHandler =>
  async (req, res, next) => {
    try {
      await Promise.resolve(fn(req, res, next));
    } catch (error) {
      console.error(`❌ Error in controller [${name}]`, error);
      next(error);
    }
  };

export default asyncHandler;
