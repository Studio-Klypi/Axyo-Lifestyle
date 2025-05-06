import type { CookieSerializeOptions } from "cookie-es";
import type { HttpRequest } from "~/types/miscellaneous/http";
import type { IBackAuthSessionCookies } from "~/types/authentication/sessions";
import type { Exception } from "~/types/miscellaneous/exceptions";
import { NotEnoughPermissionsException, NotLoggedInException } from "~/types/miscellaneous/exceptions";
import { handleException } from "~/server/services/miscellaneous/errors";

const cookiesOptions: CookieSerializeOptions = {
  path: "/",
  httpOnly: true,
  secure: false,
  sameSite: "strict",
};

export function setCookies(event: HttpRequest, values: IBackAuthSessionCookies) {
  setCookie(event, "auth-token", values.token, cookiesOptions);
  setCookie(event, "user-token", values.uuid, cookiesOptions);
}
export function getCookies(event: HttpRequest): IBackAuthSessionCookies {
  const token = getCookie(event, "auth-token");
  const uuid = getCookie(event, "user-token");

  if (!token || !uuid) throw new NotLoggedInException("Session cookies missing.");

  return {
    token,
    uuid,
  };
}
export function clearCookies(event: HttpRequest) {
  deleteCookie(event, "auth-token");
  deleteCookie(event, "user-token");
}

export async function protect(event: HttpRequest, callback: (req: HttpRequest) => Promise<unknown>, admin: boolean = false) {
  try {
    if (admin) {
      const key = event.headers.get("AdminKey");
      if (!key) return handleException(event, new NotEnoughPermissionsException("Missing API key."));
      if (key !== useRuntimeConfig().admin.key) return handleException(event, new NotEnoughPermissionsException("Invalid API key."));
      return callback(event);
    }

    const { token, uuid } = getCookies(event);
    console.log(token, uuid);

    event.context.user = null; // TODO: fetch user

    return callback(event);
  }
  catch (e) {
    return handleException(event, e as Exception);
  }
}
