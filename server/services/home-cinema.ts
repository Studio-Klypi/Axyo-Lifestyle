import type { HttpRequest } from "~/types/miscellaneous/http";
import { EStatusCode } from "~/types/miscellaneous/http";
import { handleException } from "~/server/services/miscellaneous/errors";
import type { Exception } from "~/types/miscellaneous/exceptions";
import * as meRepo from "~/server/database/repositories/home-cinema/media-entities";
import * as msRepo from "~/server/database/repositories/home-cinema/media-status";
import * as wlRepo from "~/server/database/repositories/home-cinema/watchlist";
import type { IUpdateMediaStatus } from "~/types/home-cinema";

export async function getDatabase(event: HttpRequest) {
  const { limit, offset } = getQuery(event) as { limit: string; offset: string };

  try {
    return await meRepo.get(Number(limit ?? 20), Number(offset ?? 0));
  }
  catch (e) {
    return handleException(event, e as Exception);
  }
}
export async function addToWatchlist(event: HttpRequest) {
  const { uuid: userUuid } = event.context.user;
  const id = getRouterParam(event, "mediaId");

  try {
    const watchlist = await wlRepo.create({
      userUuid,
      id: Number(id),
    });
    event.node.res.statusCode = EStatusCode.Created;
    return watchlist;
  }
  catch (e) {
    return handleException(event, e as Exception);
  }
}
export async function removeFromWatchlist(event: HttpRequest) {
  const { uuid: userUuid } = event.context.user;
  const id = getRouterParam(event, "mediaId");

  try {
    const watchlist = await wlRepo.destroy({
      userUuid,
      id: Number(id),
    });
    event.node.res.statusCode = EStatusCode.Accepted;
    return watchlist;
  }
  catch (e) {
    return handleException(event, e as Exception);
  }
}
export async function updateStatus(event: HttpRequest) {
  const { uuid: userUuid } = event.context.user;
  const id = getRouterParam(event, "mediaId");
  const body = await readBody<IUpdateMediaStatus>(event);

  try {
    const mediaStatus = await msRepo.update({
      userUuid,
      id: Number(id),
    }, body);
    event.node.res.statusCode = EStatusCode.Accepted;
    return mediaStatus;
  }
  catch (e) {
    return handleException(event, e as Exception);
  }
}
