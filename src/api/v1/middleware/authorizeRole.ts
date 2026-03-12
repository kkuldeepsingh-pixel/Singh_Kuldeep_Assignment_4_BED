import { Response, NextFunction } from "express";
import { ForbiddenError } from "../errors/ForbiddenError";
import { AuthRequest } from "./authMiddleware";

// Middleware to check allowed roles
export const authorizeRole = (allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ForbiddenError("User not authenticated"));
    }

    if (!allowedRoles.includes(req.user.role || "")) {
      return next(new ForbiddenError("Forbidden: Insufficient role"));
    }

    next();
  };
};