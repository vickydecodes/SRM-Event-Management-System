import { Router } from "express";
import { login, logoutUser, getCurrentUser } from "../controllers/auth.controller.js";
import { zodValidate } from "@core/middlewares/zod.validator.js";
import { loginSchema } from "@api/validators/auth.validator.ts";
import { authMiddleware } from "@core/middlewares/auth.middleware.ts";

const router = Router();

router.post("/login", zodValidate(loginSchema), login);
router.get("/me", authMiddleware, getCurrentUser);
router.post("/logout", authMiddleware, logoutUser);


export default router;
