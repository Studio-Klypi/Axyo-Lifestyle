import type { IUserIdPair } from "~/types/authentication/users";
import type { IMediaStatus, IUpdateMediaStatus } from "~/types/home-cinema";
import prisma from "~/server/database";

export async function update(key: IUserIdPair, payload: IUpdateMediaStatus): Promise<IMediaStatus> {
  return prisma.mediaStatus.upsert({
    where: {
      userUuid_mediaId: {
        userUuid: key.userUuid,
        mediaId: key.id,
      },
    },
    create: {
      userUuid: key.userUuid,
      mediaId: key.id,
      ...payload,
    },
    update: {
      ...payload,
    },
  });
}
