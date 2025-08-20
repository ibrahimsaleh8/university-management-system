/*
  Warnings:

  - You are about to drop the column `feedback` on the `AssignmentSubmission` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "AssignmentSubmissionStatus" ADD VALUE 'GRADED';

-- AlterTable
ALTER TABLE "AssignmentSubmission" DROP COLUMN "feedback";
