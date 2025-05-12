/*
  Warnings:

  - You are about to drop the column `collectionId` on the `quick_tasks` table. All the data in the column will be lost.
  - You are about to drop the `quick_task_collections` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "quick_task_collections" DROP CONSTRAINT "quick_task_collections_userUuid_fkey";

-- DropForeignKey
ALTER TABLE "quick_tasks" DROP CONSTRAINT "quick_tasks_collectionId_fkey";

-- AlterTable
ALTER TABLE "quick_tasks" DROP COLUMN "collectionId";

-- DropTable
DROP TABLE "quick_task_collections";
