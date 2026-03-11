import { Request, Response, NextFunction } from "express";
import { BaseError } from "../errors/BaseError";
import { HTTP_STATUS } from "../../../constants/httpStatus";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      error: err.message,
      timestamp: new Date().toISOString()
    });
  }

  console.error(err);

  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    error: "Internal server error",
    timestamp: new Date().toISOString()
  });
};