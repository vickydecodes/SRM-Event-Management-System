import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { Express } from "express";

export const applySecurityMiddlewares = (app: Express) => {
  app.use(helmet());

  app.use(
    cors({
      origin: "*",
      credentials: true,
    })
  );

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 mins
      max: 300, // limit each IP
      standardHeaders: true,
      legacyHeaders: false,
    })
  );
};
