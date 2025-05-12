import type { HttpRequest } from "~/types/miscellaneous/http";
import { EStatusCode } from "~/types/miscellaneous/http";
import * as repo from "~/server/database/repositories/productivity/quick-tasks";
import type { ICreateQT, IQuickTask, IUpdateQT } from "~/types/productivity/quick-tasks";
import { handleException } from "~/server/services/miscellaneous/errors";
import type { Exception } from "~/types/miscellaneous/exceptions";
import { UnprocessableEntityException, BadRequestException } from "~/types/miscellaneous/exceptions";

export async function getUserQuickTasks(event: HttpRequest) {
  const { uuid } = event.context.user;

  try {
    return await repo.recover(uuid);
  }
  catch (e) {
    return handleException(event, e as Exception);
  }
}

export async function createQuickTask(event: HttpRequest) {
  const { uuid } = event.context.user;
  const body = await readBody<ICreateQT>(event);

  try {
    const task = await repo.create(uuid, body);
    event.node.res.statusCode = EStatusCode.Created;
    return task;
  }
  catch (e) {
    return handleException(event, e as Exception);
  }
}

export async function updateQuickTask(event: HttpRequest) {
  const id = getRouterParam(event, "quickTaskId");
  const { uuid } = event.context.user;
  const body = await readBody<IUpdateQT>(event);

  if (!id) return handleException(event, new BadRequestException("Quick Task Id is mandatory!"));

  try {
    return await repo.update({
      id: Number(id),
      userUuid: uuid,
    }, body);
  }
  catch (e) {
    return handleException(event, e as Exception);
  }
}

export async function deleteQuickTask(event: HttpRequest) {
  const id = getRouterParam(event, "quickTaskId");
  const { uuid } = event.context.user;

  if (!id) return handleException(event, new BadRequestException("Quick Task Id is mandatory!"));

  try {
    const task = await repo.destroy({
      id: Number(id),
      userUuid: uuid,
    });
    event.node.res.statusCode = EStatusCode.Accepted;
    return task;
  }
  catch (e) {
    return handleException(event, e as Exception);
  }
}
export async function rollbackQuickTask(event: HttpRequest) {
  const id = getRouterParam(event, "quickTaskId");
  const { uuid } = event.context.user;
  const body = await readBody<IQuickTask>(event);

  if (!id) return handleException(event, new BadRequestException("Quick Task Id is mandatory!"));
  if (Number(id) !== body.id || uuid !== body.userUuid) return handleException(event, new UnprocessableEntityException("Id or User UUID doesn't match!"));

  try {
    const task = await repo.rollback(body);
    event.node.res.statusCode = EStatusCode.Created;
    return task;
  }
  catch (e) {
    return handleException(event, e as Exception);
  }
}
