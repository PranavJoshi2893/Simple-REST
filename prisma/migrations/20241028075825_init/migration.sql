-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Completed', 'Pending');

-- CreateTable
CREATE TABLE "tasks" (
    "tid" SERIAL NOT NULL,
    "task" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("tid")
);
