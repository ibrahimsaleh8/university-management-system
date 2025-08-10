-- DropForeignKey
ALTER TABLE "StudentAnswer" DROP CONSTRAINT "StudentAnswer_examQuestionId_fkey";

-- AlterTable
ALTER TABLE "StudentAnswer" ADD COLUMN     "empty" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "answer" DROP NOT NULL,
ALTER COLUMN "examQuestionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "StudentAnswer" ADD CONSTRAINT "StudentAnswer_examQuestionId_fkey" FOREIGN KEY ("examQuestionId") REFERENCES "ExamQuestion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
