/*
  Warnings:

  - You are about to drop the `DepartmentTeacher` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DepartmentTeacher" DROP CONSTRAINT "DepartmentTeacher_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "DepartmentTeacher" DROP CONSTRAINT "DepartmentTeacher_teacherId_fkey";

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "departmentId" INTEGER;

-- DropTable
DROP TABLE "DepartmentTeacher";

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;
