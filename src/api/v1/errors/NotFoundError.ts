import { BaseError } from "./BaseError";
import { HTTP_STATUS } from "../../../constants/httpStatus";

export class NotFoundError extends BaseError {
  constructor(message = "Resource not found") {
    super(message, HTTP_STATUS.NOT_FOUND);
  }
}