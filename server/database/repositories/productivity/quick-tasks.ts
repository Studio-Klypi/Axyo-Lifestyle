import prisma from "~/server/database";
import type { ICreateQT, IQuickTask, IUpdateQT } from "~/types/productivity/quick-tasks";
import type { IUserIdPair } from "~/types/authentication/users";
import { NotFoundException } from "~/types/miscellaneous/exceptions";

export async function recover(uuid: string): Promise<IQuickTask[]> {
  return prisma.quickTask.findMany({
    where: {
      userUuid: uuid,
    },
  });
}

export async function create(uuid: string, payload: ICreateQT): Promise<IQuickTask> {
  return prisma.quickTask.create({
    data: {
      userUuid: uuid,
      ...payload,
    },
  });
}

export async function update(key: IUserIdPair, payload: IUpdateQT): Promise<IQuickTask> {
  const task = await prisma.quickTask.update({
    where: {
      ...key,
    },
    data: {
      ...payload,
    },
  });
  if (!task) throw new NotFoundException("Quick Task not found!");
  return task;
}

export async function destroy(key: IUserIdPair): Promise<IQuickTask> {
  const task = await prisma.quickTask.delete({
    where: {
      ...key,
    },
  });
  if (!task) throw new NotFoundException("Quick Task not found!");
  return task;
}
export async function rollback(data: IQuickTask): Promise<IQuickTask> {
  return prisma.quickTask.create({
    data,
  });
}
