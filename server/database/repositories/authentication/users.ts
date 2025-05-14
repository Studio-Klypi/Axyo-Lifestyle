import type { Prisma } from "@prisma/client";
import argon2 from "argon2";
import type { IBackUser, ICreateUser, IUpdateUser, IUser } from "~/types/authentication/users";
import prisma from "~/server/database";
import {
  InternalServerException,
  NotFoundException, NotLoggedInException,
  UniqueConstraintViolationException,
} from "~/types/miscellaneous/exceptions";

export function reduce(payload: IBackUser): IUser {
  const json = { ...payload } as Partial<IBackUser>;
  delete json.password;
  return json as IUser;
}

export async function create(payload: ICreateUser): Promise<IUser> {
  payload.password = await argon2.hash(payload.password);

  try {
    const user = await prisma.user.create({
      data: payload,
      include: {
        avatar: true,
      },
    });
    return reduce(user);
  }
  catch (e) {
    switch ((e as Prisma.PrismaClientKnownRequestError).code) {
      case "P2002": throw new UniqueConstraintViolationException();
      default: throw new InternalServerException();
    }
  }
}
export async function update(uuid: string, payload: IUpdateUser): Promise<IUser> {
  if (payload.password) payload.password = await argon2.hash(payload.password);

  try {
    await get(uuid);

    const user = await prisma.user.update({
      where: {
        uuid,
      },
      data: payload,
      include: {
        avatar: true,
        watchlist: {
          include: {
            media: {
              include: {
                poster: true,
              },
            },
          },
        },
        mediaStatus: true,
      },
    });
    return reduce(user);
  }
  catch (e) {
    if (e instanceof NotFoundException) throw e;

    switch ((e as Prisma.PrismaClientKnownRequestError).code) {
      case "P2002": throw new UniqueConstraintViolationException();
      default: throw new InternalServerException();
    }
  }
}
export async function destroy(uuid: string): Promise<IBackUser> {
  await get(uuid);
  return prisma.user.delete({
    where: {
      uuid,
    },
  });
}

export async function get(uuid: string): Promise<IUser> {
  const user = await prisma.user.findUnique({
    where: {
      uuid,
    },
    include: {
      avatar: true,
      watchlist: {
        include: {
          media: {
            include: {
              poster: true,
            },
          },
        },
      },
      mediaStatus: true,
    },
  });
  if (!user) throw new NotFoundException();
  return reduce(user);
}
export async function getByEmail(email: string): Promise<IUser> {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      avatar: true,
    },
  });
  if (!user) throw new NotFoundException();
  return reduce(user);
}
export async function getByUsername(username: string): Promise<IUser> {
  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      avatar: true,
    },
  });
  if (!user) throw new NotFoundException();
  return reduce(user);
}
export async function getMany(): Promise<IUser[]> {
  const list = await prisma.user.findMany();
  return list.map(reduce);
}

export async function comparePassword(email: string, password: string): Promise<IUser> {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      avatar: true,
      watchlist: {
        include: {
          media: {
            include: {
              poster: true,
            },
          },
        },
      },
      mediaStatus: true,
    },
  });
  if (!user) throw new NotFoundException("Invalid credentials.");
  if (!await argon2.verify(user.password, password)) throw new NotLoggedInException("Invalid credentials.");
  return reduce(user);
}
