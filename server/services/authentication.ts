import type { HttpRequest } from "~/types/miscellaneous/http";
import { EStatusCode } from "~/types/miscellaneous/http";
import { handleException } from "~/server/services/miscellaneous/errors";
import type { Exception } from "~/types/miscellaneous/exceptions";
import * as users from "~/server/database/repositories/authentication/users";
import * as sessions from "~/server/database/repositories/authentication/sessions";
import type { ICreateUser } from "~/types/authentication/users";
import { setCookies } from "~/server/services/miscellaneous/protection";
import { sendEmail } from "~/server/services/miscellaneous/emails";
import AccountCreated from "~/server/emails/templates/authentication/AccountCreated.vue";

export async function createAccount(event: HttpRequest) {
  const body = await readBody<ICreateUser>(event);

  try {
    const user = await users.create(body);
    const session = await sessions.create(user.uuid);

    setCookies(event, {
      uuid: session.userUuid,
      token: session.token,
    });

    sendEmail({
      to: user.email,
      subject: "Welcome to Axyo ✨",
    }, {
      component: AccountCreated,
      props: {
        username: user.username,
      },
    }).catch();

    event.node.res.statusCode = EStatusCode.Created;
    return user;
  }
  catch (e) {
    return handleException(event, e as Exception);
  }
}
export async function login(event: HttpRequest) {
  const body = await readBody<{
    email: string;
    password: string;
  }>(event);

  try {
    const user = await users.comparePassword(body.email, body.password);
    const session = await sessions.create(user.uuid);

    setCookies(event, {
      uuid: session.userUuid,
      token: session.token,
    });

    event.node.res.statusCode = EStatusCode.Accepted;
    return user;
  }
  catch (e) {
    return handleException(event, e as Exception);
  }
}
