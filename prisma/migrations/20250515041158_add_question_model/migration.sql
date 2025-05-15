/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Flashcard` table. All the data in the column will be lost.
  - You are about to drop the column `question` on the `Flashcard` table. All the data in the column will be lost.
  - You are about to drop the column `questionRefId` on the `Flashcard` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Flashcard` table. All the data in the column will be lost.
  - You are about to drop the `_FavoriteFlashcards` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `questionText` to the `Flashcard` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Flashcard" DROP CONSTRAINT "Flashcard_questionRefId_fkey";

-- DropForeignKey
ALTER TABLE "Flashcard" DROP CONSTRAINT "Flashcard_userId_fkey";

-- DropForeignKey
ALTER TABLE "_FavoriteFlashcards" DROP CONSTRAINT "_FavoriteFlashcards_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavoriteFlashcards" DROP CONSTRAINT "_FavoriteFlashcards_B_fkey";

-- AlterTable
ALTER TABLE "Flashcard" DROP COLUMN "createdAt",
DROP COLUMN "question",
DROP COLUMN "questionRefId",
DROP COLUMN "userId",
ADD COLUMN     "questionId" INTEGER,
ADD COLUMN     "questionText" TEXT NOT NULL;

-- DropTable
DROP TABLE "_FavoriteFlashcards";

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Flashcard" ADD CONSTRAINT "Flashcard_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;
