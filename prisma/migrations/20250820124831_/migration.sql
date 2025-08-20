/*
  Warnings:

  - The values [COMPLETED] on the enum `AssignmentSubmissionStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AssignmentSubmissionStatus_new" AS ENUM ('SUBMITTED', 'GRADED');
ALTER TABLE "AssignmentSubmission" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "AssignmentSubmission" ALTER COLUMN "status" TYPE "AssignmentSubmissionStatus_new" USING ("status"::text::"AssignmentSubmissionStatus_new");
ALTER TYPE "AssignmentSubmissionStatus" RENAME TO "AssignmentSubmissionStatus_old";
ALTER TYPE "AssignmentSubmissionStatus_new" RENAME TO "AssignmentSubmissionStatus";
DROP TYPE "AssignmentSubmissionStatus_old";
ALTER TABLE "AssignmentSubmission" ALTER COLUMN "status" SET DEFAULT 'SUBMITTED';
COMMIT;
