/*
  Warnings:

  - You are about to drop the `Evaluation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Suggestion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Evaluation" DROP CONSTRAINT "Evaluation_suggestionId_fkey";

-- DropTable
DROP TABLE "Evaluation";

-- DropTable
DROP TABLE "Suggestion";

-- CreateTable
CREATE TABLE "suggestion" (
    "id" SERIAL NOT NULL,
    "errorCode" CHAR(6) NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "suggestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evaluation" (
    "id" SERIAL NOT NULL,
    "errorCode" CHAR(6) NOT NULL,
    "clientCode" CHAR(6) NOT NULL,
    "rating" BOOLEAN NOT NULL,
    "comment" TEXT,
    "suggestionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "evaluation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "evaluation" ADD CONSTRAINT "evaluation_suggestionId_fkey" FOREIGN KEY ("suggestionId") REFERENCES "suggestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
