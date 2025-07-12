/*
  Warnings:

  - Added the required column `duration` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exam" ADD COLUMN     "duration" TIMESTAMP(3) NOT NULL;
