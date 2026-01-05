import { AccessRequest } from "../middlewares/access.middleware.js";

export const buildQuery = (req: AccessRequest): Record<string, any> => {
  const q: Record<string, any> = {};

  if (req.query && typeof req.query === "object") {
    Object.assign(q, req.query);
  }

  if (req.queryFilter) {
    Object.assign(q, req.queryFilter);
  }

  return q;
};
