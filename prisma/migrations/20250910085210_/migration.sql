/*
  Warnings:

  - You are about to drop the column `biography` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Teacher` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "AttachmentFileType" AS ENUM ('IMAGE', 'PDF');

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "biography",
DROP COLUMN "created_at";

-- CreateTable
CREATE TABLE "AnnouncementAttachment" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" "AttachmentFileType" NOT NULL,
    "announcementId" TEXT NOT NULL,

    CONSTRAINT "AnnouncementAttachment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AnnouncementAttachment" ADD CONSTRAINT "AnnouncementAttachment_announcementId_fkey" FOREIGN KEY ("announcementId") REFERENCES "Announcement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
