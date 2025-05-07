import type { IAuthSession, IBackAuthSessionCookies } from "~/types/authentication/sessions";
import prisma from "~/server/database";
import { NotFoundException } from "~/types/miscellaneous/exceptions";

export async function create(uuid: string): Promise<IAuthSession> {
  return prisma.authSession.create({
    data: {
      userUuid: uuid,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
    },
  });
}
export async function revoke(payload: IBackAuthSessionCookies): Promise<IAuthSession> {
  await get(payload);
  return prisma.authSession.update({
    where: {
      userUuid_token: {
        userUuid: payload.uuid,
        token: payload.token,
      },
    },
    data: {
      revokedAt: new Date(),
    },
  });
}

export async function get(payload: IBackAuthSessionCookies): Promise<IAuthSession> {
  const session = await prisma.authSession.findUnique({
    where: {
      userUuid_token: {
        userUuid: payload.uuid,
        token: payload.token,
      },
    },
  });
  if (!session) throw new NotFoundException();
  return session;
}

export async function prune(): Promise<number> {
  const { count } = await prisma.authSession.deleteMany({
    where: {
      OR: [
        {
          expiresAt: {
            lte: new Date(),
          },
        },
        {
          NOT: {
            revokedAt: null,
          },
        },
      ],
    },
  });
  return count;
}
