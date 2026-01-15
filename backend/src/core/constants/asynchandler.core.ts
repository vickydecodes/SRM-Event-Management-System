import chalk from 'chalk';
import { Request, Response, NextFunction } from 'express';

type ControllerFn = (req: Request, res: Response, next: NextFunction) => Promise<void>;

const asyncHandler = (name: string, fn: ControllerFn): ControllerFn => {
  const functionName = name || 'anonymous function';

  return async (req: Request, res: Response, next: NextFunction) => {
    console.log(
      chalk.blueBright(
        `[AsyncHandler] Executing function: ${functionName} | Route: ${req.originalUrl} | Method: ${req.method}`
      )
    );

    try {
      await fn(req, res, next);
    } catch (err: any) {
      err.caller = functionName;
      err.method = req.method || 'unknown method';
      err.route = req.originalUrl || 'unknown route';
      next(err);
    }
  };
};

export default asyncHandler;
