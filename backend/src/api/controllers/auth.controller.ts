import { Request, Response } from "express";
import sendResponse from "@core/constants/responsewrapper.core.ts";
import { wrapControllers } from "@core/constants/wrapcontrollers.core.ts";
import * as service from "@core/services/auth.services.js";

const isProd = process.env.NODE_ENV === "production";

const controllers = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await service.login(email, password);

    if (!result) {
      return sendResponse.notFound(res, "user");
    }

    const { user, token } = result;

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: isProd ? true : false,
      sameSite: isProd ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    return sendResponse.fetched(res, "user", user);
  },

  getCurrentUser: async (req: Request, res: Response) => {
    const token = req.cookies?.access_token;

    if (!token) {
      return sendResponse.unauthorized(res, "Unauthenticated");
    }

    const user = await service.getCurrentUser(token);

    delete (user as any).token;

    return sendResponse.fetched(res, "user", user);
  },
  logoutUser: async (req: Request, res: Response) => {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: isProd ? true : false,
      sameSite: isProd ? 'none' : 'lax',
      path: '/',
    });

    const result = await service.logout();

    return sendResponse.success(res, result.message);
  },
};

export const { login, getCurrentUser, logoutUser } = wrapControllers(controllers);
