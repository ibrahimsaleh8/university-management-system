/*
  Warnings:

  - You are about to drop the `_ClassToStudent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ClassToStudent" DROP CONSTRAINT "_ClassToStudent_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClassToStudent" DROP CONSTRAINT "_ClassToStudent_B_fkey";

-- DropTable
DROP TABLE "_ClassToStudent";

-- CreateTable
CREATE TABLE "studentClass" (
    "studentId" INTEGER NOT NULL,
    "classId" INTEGER NOT NULL,
    "classGrade" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "studentClass_pkey" PRIMARY KEY ("classId","studentId")
);

-- AddForeignKey
ALTER TABLE "studentClass" ADD CONSTRAINT "studentClass_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentClass" ADD CONSTRAINT "studentClass_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
