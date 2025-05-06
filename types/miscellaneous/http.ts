import type { H3Event } from "h3";

export type HttpRequest = H3Event<Request>;

export enum EStatusCode {
  Ok = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,

  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,

  InternalServerError = 500,
}
