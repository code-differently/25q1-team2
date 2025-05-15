/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Flashcard" ADD COLUMN     "questionRefId" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ALTER COLUMN "email" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Flashcard" ADD CONSTRAINT "Flashcard_questionRefId_fkey" FOREIGN KEY ("questionRefId") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;
