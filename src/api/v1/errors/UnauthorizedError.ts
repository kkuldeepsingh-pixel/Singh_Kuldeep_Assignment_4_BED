import { BaseError } from "./BaseError";
import { HTTP_STATUS } from "../../../constants/httpStatus";

export class UnauthorizedError extends BaseError {
  constructor(message = "Unauthorized access") {
    super(message, HTTP_STATUS.UNAUTHORIZED);
  }
}