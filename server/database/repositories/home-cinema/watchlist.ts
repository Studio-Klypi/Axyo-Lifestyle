import type { Prisma } from "@prisma/client";
import type { IUserIdPair } from "~/types/authentication/users";
import type { IWatchlist } from "~/types/home-cinema";
import prisma from "~/server/database";
import {
  InternalServerException,
  NotFoundException,
  UniqueConstraintViolationException,
} from "~/types/miscellaneous/exceptions";

export async function create(key: IUserIdPair): Promise<IWatchlist> {
  try {
    return await prisma.watchlist.create({
      data: {
        userUuid: key.userUuid,
        mediaId: key.id,
      },
      include: {
        media: {
          include: {
            poster: true,
          },
        },
      },
    });
  }
  catch (e) {
    switch ((e as Prisma.PrismaClientKnownRequestError).code) {
      case "P2002": throw new UniqueConstraintViolationException("Already in your watchlist!");
      default: throw new InternalServerException();
    }
  }
}
export async function destroy(key: IUserIdPair): Promise<IWatchlist> {
  const watchlist = await prisma.watchlist.delete({
    where: {
      userUuid_mediaId: {
        userUuid: key.userUuid,
        mediaId: key.id,
      },
    },
  });
  if (!watchlist) throw new NotFoundException("Not in your watchlist!");
  return watchlist;
}
