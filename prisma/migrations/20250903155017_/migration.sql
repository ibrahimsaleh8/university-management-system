-- CreateTable
CREATE TABLE "AnnouncementLike" (
    "announcementId" TEXT NOT NULL,
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "AnnouncementLike_pkey" PRIMARY KEY ("announcementId","studentId")
);

-- CreateTable
CREATE TABLE "AnnouncementDisLike" (
    "announcementId" TEXT NOT NULL,
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "AnnouncementDisLike_pkey" PRIMARY KEY ("announcementId","studentId")
);

-- AddForeignKey
ALTER TABLE "AnnouncementLike" ADD CONSTRAINT "AnnouncementLike_announcementId_fkey" FOREIGN KEY ("announcementId") REFERENCES "Announcement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnnouncementLike" ADD CONSTRAINT "AnnouncementLike_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnnouncementDisLike" ADD CONSTRAINT "AnnouncementDisLike_announcementId_fkey" FOREIGN KEY ("announcementId") REFERENCES "Announcement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnnouncementDisLike" ADD CONSTRAINT "AnnouncementDisLike_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
