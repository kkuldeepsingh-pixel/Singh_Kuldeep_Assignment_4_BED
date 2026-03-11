import { Request, Response, NextFunction } from "express";
import admin from "firebase-admin";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { ForbiddenError } from "../errors/ForbiddenError";

export interface AuthRequest extends Request {
  user?: { uid: string; email: string; role?: string };
}

// Authenticate user by Firebase ID token
export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new UnauthorizedError("No token provided"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email!,
      role: decodedToken.role, // from custom claims
    };
    next();
  } catch (err: any) {
    return next(new UnauthorizedError("Invalid or expired token"));
  }
};

// Authorize user by role
export const authorizeRole = (allowedRoles: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) return next(new UnauthorizedError("No user info found"));
    if (!allowedRoles.includes(req.user.role || "")) {
      return next(new ForbiddenError("Forbidden: Insufficient role"));
    }
    next();
  };
};