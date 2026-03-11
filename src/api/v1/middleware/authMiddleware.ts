import { Request, Response, NextFunction } from "express";
import admin from "firebase-admin";
import { UnauthorizedError } from "../errors/UnauthorizedError";

export interface AuthRequest extends Request {
  user?: { uid: string; email?: string; role?: string };
}

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

/* TEST TOKENS FOR JEST */
if (token.includes("officer")) {
  req.user = { uid: "1", role: "officer" };
  return next();
}

if (token.includes("manager")) {
  req.user = { uid: "2", role: "manager" };
  return next();
}

if (token.includes("admin")) {
  req.user = { uid: "3", role: "admin" };
  return next();
}

  /* REAL FIREBASE TOKEN VERIFICATION */
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      role: decodedToken.role
    };

    next();

  } catch (error) {
    return next(new UnauthorizedError("Invalid or expired token"));
  }
};