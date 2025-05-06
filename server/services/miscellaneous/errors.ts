import type { HttpRequest } from "~/types/miscellaneous/http";
import type { Exception } from "~/types/miscellaneous/exceptions";

export function handleException(event: HttpRequest, err: Exception) {
  return sendError(event, createError({
    statusCode: err.code,
    statusMessage: err.message,
    message: err.message,
  }));
}
