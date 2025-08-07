/*
  Warnings:

  - Made the column `grade` on table `AssignmentSubmission` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "ExamStatus" ADD VALUE 'GRADED';

-- AlterTable
ALTER TABLE "AssignmentSubmission" ALTER COLUMN "grade" SET NOT NULL,
ALTER COLUMN "grade" SET DEFAULT 0;
