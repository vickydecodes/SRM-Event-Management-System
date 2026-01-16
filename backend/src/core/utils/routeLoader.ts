// src/core/utils/routeLoader.ts
import { glob } from "glob";
import path from "path";
import pluralize from "pluralize";
import listEndpoints from "express-list-endpoints";
import chalk from "chalk";
import { Application, Router } from "express";


const API_VERSION = 'v1';


export const loadRoutes = async (app: Application): Promise<void> => {
  const startTime = Date.now();
  console.log(chalk.blueBright.bold("\n🚀 Starting Route Loader...\n"));

  const routes = await glob("src/api/routes/**/*.route.ts", {
    ignore: ["node_modules/**", "dist/**"],
  });

  console.log(chalk.cyan(`📁 Glob Search: Found ${chalk.bold(routes.length)} route file(s):\n`));
  routes.forEach((file, idx) => {
    console.log(chalk.dim(`   [${idx + 1}] ${file}`));
  });
  console.log(""); 

  let loadedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (const [index, file] of routes.entries()) {
    const fileName = path.basename(file, ".route.ts");
    const baseRoute = `/api/${API_VERSION}/${pluralize(fileName.replace(/_/g, "-").toLowerCase())}`;

    try {
      console.log(chalk.yellow(`\n[${index + 1}/${routes.length}] Loading → ${chalk.bold(fileName)}`));
      console.log(chalk.dim(`    Path: ${file}`));
      console.log(chalk.dim(`    Mount: ${chalk.underline(baseRoute)}\n`));

      const fileUrl = new URL(`file://${path.resolve(file)}`).href;
      const routeModule = await import(fileUrl);

      const moduleKeys = Object.keys(routeModule);
      const hasDefault = "default" in routeModule;
      const isRouter = hasDefault && routeModule.default instanceof Router;

      console.log(
        chalk.gray(
          `    Module: ${moduleKeys.length} exports [${moduleKeys.join(", ")}] | ` +
            `default: ${hasDefault ? "yes" : "no"} | ` +
            `Router: ${isRouter ? chalk.green("yes") : chalk.red("no")}`
        )
      );

      if (!hasDefault) {
        console.log(chalk.red("    ⚠️  No default export — skipping"));
        skippedCount++;
        continue;
      }

      if (!(routeModule.default instanceof Router)) {
        console.log(chalk.red("    ⚠️  Default export is not an Express Router — skipping"));
        skippedCount++;
        continue;
      }

      app.use(baseRoute, routeModule.default);
      loadedCount++;

      const endpoints = listEndpoints(app).filter((ep) => ep.path.startsWith(baseRoute));
      console.log(chalk.greenBright(`    ✅ Mounted ${endpoints.length} endpoint(s):`));
      endpoints.forEach((ep) => {
        const methods = ep.methods.join(", ");
        console.log(chalk.dim(`       ${chalk.bold(methods.padEnd(10))} → ${ep.path}`));
      });
    } catch (err: any) {
      failedCount++;
      console.error(chalk.red(`    ❌ Import failed: ${file}`));
      console.error(chalk.red(`       Error: ${err.message}`));
      if (err.stack) {
        console.error(chalk.dim(err.stack.split("\n").slice(1).join("\n")));
      }
    }
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log(chalk.blueBright.bold("\n" + "=".repeat(60)));
  console.log(chalk.blueBright.bold("📊 ROUTE LOADER SUMMARY"));
  console.log(chalk.blueBright.bold("=".repeat(60) + "\n"));

  console.log(chalk.greenBright(`   ✅ Loaded:     ${loadedCount} route(s)`));
  console.log(chalk.yellow(`   ⚠️  Skipped:    ${skippedCount} file(s)`));
  console.log(chalk.red(`   ❌ Failed:     ${failedCount} import(s)`));
  console.log(chalk.cyan(`   ⏱️  Time:       ${duration}s\n`));

  if (loadedCount > 0) {
    console.log(chalk.magentaBright(`🎉 All ${loadedCount} valid routes loaded and mounted!\n`));
  } else {
    console.log(chalk.redBright(`😔 No routes were loaded. Check your .route.ts files.\n`));
  }
};