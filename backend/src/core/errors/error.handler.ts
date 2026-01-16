import { Request, Response, NextFunction } from "express";
import sendResponse from "../constants/responsewrapper.core.ts";
import chalk from "chalk";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(chalk.redBright(`[Error] Function: ${err.caller} | Route: ${err.route} | Method: ${err.method} | \nOccured Error during execution: `, err));
  return sendResponse.error(res, err.caller || "server", err);
};

export default errorHandler;
   