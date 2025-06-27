/*
  Warnings:

  - You are about to drop the column `academicYearId` on the `StudentEnrollment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "StudentEnrollment" DROP CONSTRAINT "StudentEnrollment_academicYearId_fkey";

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "academicYearId" INTEGER;

-- AlterTable
ALTER TABLE "StudentEnrollment" DROP COLUMN "academicYearId";

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_academicYearId_fkey" FOREIGN KEY ("academicYearId") REFERENCES "AcademicYear"("id") ON DELETE SET NULL ON UPDATE CASCADE;
