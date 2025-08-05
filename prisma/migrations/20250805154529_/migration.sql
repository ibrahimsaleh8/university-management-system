-- CreateEnum
CREATE TYPE "AssignmentSubmissionStatus" AS ENUM ('SUBMITTED', 'COMPLETED');

-- AlterTable
ALTER TABLE "AssignmentSubmission" ADD COLUMN     "status" "AssignmentSubmissionStatus" NOT NULL DEFAULT 'SUBMITTED';
