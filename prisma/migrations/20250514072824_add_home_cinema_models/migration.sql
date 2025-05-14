-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('MOVIE', 'TV_SERIES');

-- CreateEnum
CREATE TYPE "MediaNotation" AS ENUM ('BAD', 'GOOD', 'VERY_GOOD');

-- CreateTable
CREATE TABLE "media_entities" (
    "id" SERIAL NOT NULL,
    "type" "MediaType" NOT NULL,
    "title" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "posterRef" TEXT,
    "year" INTEGER NOT NULL,
    "genders" TEXT[],
    "actors" TEXT[],
    "duration" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "media_entities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "watchlist_relations" (
    "userUuid" TEXT NOT NULL,
    "mediaId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "watchlist_relations_pkey" PRIMARY KEY ("userUuid","mediaId")
);

-- CreateTable
CREATE TABLE "media_status" (
    "userUuid" TEXT NOT NULL,
    "mediaId" INTEGER NOT NULL,
    "note" "MediaNotation",
    "viewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "media_status_pkey" PRIMARY KEY ("userUuid","mediaId")
);

-- AddForeignKey
ALTER TABLE "media_entities" ADD CONSTRAINT "media_entities_posterRef_fkey" FOREIGN KEY ("posterRef") REFERENCES "files"("sum") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watchlist_relations" ADD CONSTRAINT "watchlist_relations_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watchlist_relations" ADD CONSTRAINT "watchlist_relations_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "media_entities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_status" ADD CONSTRAINT "media_status_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_status" ADD CONSTRAINT "media_status_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "media_entities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
