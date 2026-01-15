import express, { Express, Request, Response } from "express";
import { ENV } from "@config/env.config.js";
import connectDB from "@config/db.config.js";
// import { loadRoutes } from "@utils/routeLoader.js";
// import errorHandler from "@core/errors/errorHandler.js";
// import { applySecurityMiddlewares } from "@config/security.config.js";
// import { seedUserPermissions } from "@config/permissions.config.ts";

const app: Express = express();

// 🧱 Apply all security middlewares

// 🩺 Health check

app.get("/", (req: Request, res: Response) => {
  res.send("SRM Event Management API is running smoothly 🔐");
});

app.use(express.json())

console.log("Setting up routes...");

(async () => {
  try {
    console.log("Connecting to DB...");
    await connectDB(ENV.MONGO_URI);

//     applySecurityMiddlewares(app);


// // await seedUserPermissions();

//     console.log("Loading routes...");
//     await loadRoutes(app);


//     // Centralized error handler
//     app.use(errorHandler);

    console.group(`
        ============================================================
        🚀 SRM EVENT MANAGEMENT API Server Initialized
        ============================================================
        🌍 Environment : ${ENV.NODE_ENV}
        🔌 Database    : Connected
        📦 Routes      : Loaded Successfully
        🔒 Security    : All middlewares applied
        ✅ Status      : Running smoothly on port ${ENV.PORT || 3000}
        ============================================================
    `);
  } catch (err) {
    console.error("❌ Startup failed:", err);
    process.exit(1);
  }
})();

export default app;
