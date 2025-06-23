/*
  Warnings:

  - You are about to drop the column `courseOfferingId` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the `ClassCourse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClassTeacher` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `classId` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseOfferingId` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherId` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_courseOfferingId_fkey";

-- DropForeignKey
ALTER TABLE "ClassCourse" DROP CONSTRAINT "ClassCourse_classId_fkey";

-- DropForeignKey
ALTER TABLE "ClassCourse" DROP CONSTRAINT "ClassCourse_courseId_fkey";

-- DropForeignKey
ALTER TABLE "ClassTeacher" DROP CONSTRAINT "ClassTeacher_classId_fkey";

-- DropForeignKey
ALTER TABLE "ClassTeacher" DROP CONSTRAINT "ClassTeacher_teacherId_fkey";

-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "courseOfferingId",
ADD COLUMN     "classId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "courseOfferingId" TEXT NOT NULL,
ADD COLUMN     "teacherId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "ClassCourse";

-- DropTable
DROP TABLE "ClassTeacher";

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_courseOfferingId_fkey" FOREIGN KEY ("courseOfferingId") REFERENCES "CourseOffering"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
