import prisma from "~/server/database";

export async function get(limit: number, offset: number) {
  return prisma.mediaEntity.findMany({
    take: limit,
    skip: offset,
    include: {
      poster: true,
    },
  });
}
