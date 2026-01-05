import { Request, Response } from "express";
import sendResponse from "@core/constants/responseWrapper.js";
import { wrapControllers } from "@core/constants/wrapControllers.js";
import * as service from "@core/services/auth.services.js";

const controllers = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await service.login(email, password);
    return sendResponse.success(res, "Login successful", result);
  },
};

export const { login } = wrapControllers(controllers);
