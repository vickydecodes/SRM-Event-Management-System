import express, { Express, Request, Response } from 'express';
import { ENV } from '@config/env.config.js';
import connectDB from '@config/db.config.js';
import { loadRoutes } from '@utils/routeLoader.js';
import errorHandler from '@core/errors/error.handler.js';
import { applySecurityMiddlewares } from '@config/security.config.js';
import { unallocatedRouteMiddleware } from '@core/middlewares/unallocated.middleware.js';

// Note: Make sure this import path is correct for your project structure
import departmentRouter from './api/routes/department.route.js';
import studentRouter from './api/routes/student.route.ts' // ← adjust if needed (.ts / .js / routes vs route)

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('SRM Event Management API is running smoothly 🔐');
});

(async () => {
  try {
    console.log('Connecting to DB...');
    await connectDB(ENV.MONGO_URI);

    applySecurityMiddlewares(app);

    // ── Debug mounting ─────────────────────────────────────────────
    if (!departmentRouter) {
      console.error('❌ departmentRouter is undefined! Check import path.');
      process.exit(1);
    }

    // Mount with logging
    app.use('/departments', departmentRouter);
    console.log('✅ Department routes mounted successfully at /departments');
    app.use('/students', studentRouter);
    // Safer version of route logging that won't crash
    console.log('All registered routes:');
    
    if (!app._router?.stack) {
      console.log('  (Router stack not available yet)');
    } else {
      app._router.stack.forEach((layer: any) => {
        // Skip invalid layers
        if (!layer) return;

        if (layer.route) {
          // Regular route
          const methods = Object.keys(layer.route.methods || {}).join(', ').toUpperCase();
          console.log(`  ${methods.padEnd(10)} → ${layer.route.path}`);
        } 
        else if (layer.name === 'router' && layer.handle?.stack) {
          // Mounted router with safe check
          const routerPath = layer.regexp?.toString().replace(/^\^\\\/|\\\//g, '/') || '(unnamed)';
          console.log(`  [Router] ${routerPath}`);
          
          layer.handle.stack.forEach((handler: any) => {
            if (handler.route) {
              const methods = Object.keys(handler.route.methods || {}).join(', ').toUpperCase();
              console.log(`      ${methods.padEnd(10)} → ${handler.route.path}`);
            }
          });
        }
      });
    }

    console.log('Loading other routes via loader...');
    await loadRoutes(app);

    app.use(unallocatedRouteMiddleware);
    app.use(errorHandler);

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
    console.error('❌ Startup failed:', err);
    process.exit(1);
  }
})();

export default app;