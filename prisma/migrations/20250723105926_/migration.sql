-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('TEACHER', 'Student', 'ADMIN');

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "fromRole" "UserRole" NOT NULL,
    "toRole" "UserRole" NOT NULL,
    "emailFrom" TEXT NOT NULL,
    "emailTo" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MessageReply" (
    "id" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "fromRole" "UserRole" NOT NULL,
    "toRole" "UserRole" NOT NULL,
    "emailFrom" TEXT NOT NULL,
    "emailTo" TEXT NOT NULL,
    "replyText" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "parentReplyId" TEXT,

    CONSTRAINT "MessageReply_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Message_emailFrom_key" ON "Message"("emailFrom");

-- CreateIndex
CREATE UNIQUE INDEX "Message_emailTo_key" ON "Message"("emailTo");

-- CreateIndex
CREATE INDEX "MessageReply_messageId_idx" ON "MessageReply"("messageId");

-- CreateIndex
CREATE INDEX "MessageReply_emailFrom_idx" ON "MessageReply"("emailFrom");

-- CreateIndex
CREATE INDEX "MessageReply_emailTo_idx" ON "MessageReply"("emailTo");

-- CreateIndex
CREATE INDEX "MessageReply_parentReplyId_idx" ON "MessageReply"("parentReplyId");

-- AddForeignKey
ALTER TABLE "MessageReply" ADD CONSTRAINT "MessageReply_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageReply" ADD CONSTRAINT "MessageReply_parentReplyId_fkey" FOREIGN KEY ("parentReplyId") REFERENCES "MessageReply"("id") ON DELETE SET NULL ON UPDATE CASCADE;
