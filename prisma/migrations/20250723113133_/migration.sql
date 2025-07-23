/*
  Warnings:

  - The values [Student] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `chatId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('TEACHER', 'STUDENT', 'ADMIN');
ALTER TABLE "Message" ALTER COLUMN "fromRole" TYPE "UserRole_new" USING ("fromRole"::text::"UserRole_new");
ALTER TABLE "Message" ALTER COLUMN "toRole" TYPE "UserRole_new" USING ("toRole"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
COMMIT;

-- DropIndex
DROP INDEX "Message_emailFrom_key";

-- DropIndex
DROP INDEX "Message_emailTo_key";

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "chatId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Chat" (
    "id" TEXT NOT NULL,
    "email1" TEXT NOT NULL,
    "email2" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Chat_email1_idx" ON "Chat"("email1");

-- CreateIndex
CREATE INDEX "Chat_email2_idx" ON "Chat"("email2");

-- CreateIndex
CREATE INDEX "Message_emailFrom_idx" ON "Message"("emailFrom");

-- CreateIndex
CREATE INDEX "Message_emailTo_idx" ON "Message"("emailTo");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
