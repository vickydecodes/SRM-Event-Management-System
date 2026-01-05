import { Router } from "express";
import { login } from "../controllers/auth.controller.js";
import { zodValidate } from "@core/middlewares/zod.validator.js";
import { loginSchema } from "@api/validators/auth.validator.ts";

const router = Router();

/**
 * PUBLIC ROUTES
 */
router.post("/login", zodValidate(loginSchema), login);

export default router;
