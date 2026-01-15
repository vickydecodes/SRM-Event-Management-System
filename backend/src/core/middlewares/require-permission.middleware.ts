import { Response, NextFunction } from 'express';
import chalk from 'chalk';
import sendResponse from '@core/constants/responsewrapper.core.js';
import { AccessRequest } from './access.middleware.js';


export const requirePermission =
  (
    module: string,
    action: string,
    options?: {
      allowRoles?: string[];
    }
  ) =>
  (req: AccessRequest, res: Response, next: NextFunction) => {
    try {
      const role = req.role;

      if (options?.allowRoles?.includes(role!)) {
        console.log(
          chalk.bgBlue.white(' ROLE BYPASS '),
          chalk.green(`✔ ${role} allowed to access ${module}.${action}`)
        );
        return next();
      }

      if (!req.can) {
        console.log(chalk.red('❌ req.can is missing — accessControl not applied'));
        return sendResponse.error(res, 'permission', 'Permission system not initialized');
      }

      const isAllowed = req.can(action, module);

      if (!isAllowed) {
        console.log('\n' + chalk.bgRed.white.bold(' PERMISSION DENIED '));
        console.log(chalk.red('🚫 Operation:'), chalk.yellow(`${module}.${action}`));
        console.log(chalk.red('👤 Role:'), chalk.cyan(role));
        console.log(
          chalk.red('🔐 Permissions:'),
          chalk.gray(JSON.stringify(req.permissions, null, 2))
        );

        return sendResponse.forbidden(
          res,
          `You do not have permission to perform ${module}.${action}`
        );
      }

      console.log(
        chalk.green.bold('✔ PERMISSION GRANTED '),
        chalk.gray(`→ ${module}.${action}`),
        chalk.blue(`(role: ${role})`)
      );

      return next();
    } catch (error) {
      console.log(chalk.bgRed.white('❌ requirePermission Error:'), chalk.red(error));

      return sendResponse.error(res, 'permission', error);
    }
  };
