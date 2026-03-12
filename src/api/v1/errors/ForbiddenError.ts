import { BaseError } from "./BaseError";
import { HTTP_STATUS } from "../../../constants/httpStatus";

export class ForbiddenError extends BaseError {
  constructor(message = "Forbidden action") {
    super(message, HTTP_STATUS.FORBIDDEN);
  }
}