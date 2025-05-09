-- CreateTable
CREATE TABLE "quick_task_collections" (
    "id" SERIAL NOT NULL,
    "userUuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "quick_task_collections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quick_tasks" (
    "id" SERIAL NOT NULL,
    "userUuid" TEXT NOT NULL,
    "collectionId" INTEGER,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "quick_tasks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "quick_task_collections" ADD CONSTRAINT "quick_task_collections_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quick_tasks" ADD CONSTRAINT "quick_tasks_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quick_tasks" ADD CONSTRAINT "quick_tasks_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "quick_task_collections"("id") ON DELETE SET NULL ON UPDATE CASCADE;
