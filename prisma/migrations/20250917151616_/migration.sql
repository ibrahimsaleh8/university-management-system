/*
  Warnings:

  - Added the required column `userRole` to the `ForgotPasswords` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ForgotPasswords" ADD COLUMN     "userRole" "UserRole" NOT NULL;
