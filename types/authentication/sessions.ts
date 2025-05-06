import type { TNullable } from "~/types/miscellaneous/generics";

export interface IAuthSession {
  userUuid: string;
  token: string;
  createdAt: Date;
  expiresAt: Date;
  revokedAt?: TNullable<Date>;
}
