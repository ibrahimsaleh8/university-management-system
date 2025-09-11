-- DropForeignKey
ALTER TABLE "Attachment" DROP CONSTRAINT "Attachment_announcementId_fkey";

-- AlterTable
ALTER TABLE "Attachment" ALTER COLUMN "announcementId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_announcementId_fkey" FOREIGN KEY ("announcementId") REFERENCES "Announcement"("id") ON DELETE SET NULL ON UPDATE CASCADE;
