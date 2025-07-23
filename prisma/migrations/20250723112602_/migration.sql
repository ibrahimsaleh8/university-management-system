/*
  Warnings:

  - You are about to drop the `MessageReply` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MessageReply" DROP CONSTRAINT "MessageReply_messageId_fkey";

-- DropForeignKey
ALTER TABLE "MessageReply" DROP CONSTRAINT "MessageReply_parentReplyId_fkey";

-- DropTable
DROP TABLE "MessageReply";
