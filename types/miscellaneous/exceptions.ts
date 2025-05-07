import { EStatusCode } from "~/types/miscellaneous/http";

export class Exception extends Error {
  code: EStatusCode;

  constructor(code: EStatusCode, message?: string) {
    super(message);
    this.code = code;
  }
}

export class BadRequestException extends Exception {
  constructor(message?: string) {
    super(EStatusCode.BadRequest, message ?? "Bad request.");
  }
}
export class NotLoggedInException extends Exception {
  constructor(message?: string) {
    super(EStatusCode.Unauthorized, message ?? "Not logged in.");
  }
}
export class NotEnoughPermissionsException extends Exception {
  constructor(message?: string) {
    super(EStatusCode.Forbidden, message ?? "Not enough permissions.");
  }
}
export class NotFoundException extends Exception {
  constructor(message?: string) {
    super(EStatusCode.NotFound, message ?? "Entity not found.");
  }
}
export class UniqueConstraintViolationException extends Exception {
  constructor(message?: string) {
    super(EStatusCode.Conflict, message ?? "Unique constraint violation.");
  }
}
export class InternalServerException extends Exception {
  constructor(message?: string) {
    super(EStatusCode.InternalServerError, message ?? "Internal server error.");
  }
}
