import { Express } from "express";
import fs from "fs";
import path from "path";

export const loadRoutes = async (app: Express) => {
  const routesPath = path.join(process.cwd(), "src/api/routes");

  const files = fs
    .readdirSync(routesPath)
    .filter((file) => file.endsWith(".route.ts") || file.endsWith(".route.js"));

  for (const file of files) {
    const route = await import(path.join(routesPath, file));
    const routeName = file.replace(".route.ts", "").replace(".route.js", "");

    app.use(`/api/${routeName}`, route.default);
    console.log(`✅ Route loaded: /api/${routeName}`);
  }
};
