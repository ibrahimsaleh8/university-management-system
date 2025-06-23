/*
  Warnings:

  - Added the required column `registerBegin` to the `Semester` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Semester" ADD COLUMN     "registerBegin" TIMESTAMP(3) NOT NULL;
