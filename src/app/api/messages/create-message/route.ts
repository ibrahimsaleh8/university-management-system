import {
  CreateMessageDataType,
  CreateMessageSchema,
  MessageRoles,
} from "@/validation/CreateMessageSchema";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const messageData = (await req.json()) as CreateMessageDataType;

    const validation = CreateMessageSchema.safeParse(messageData);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    // Email Validation
    if (messageData.receiverRole == "ADMIN") {
      const isValidEmail = await prisma.admin.findUnique({
        where: {
          email: messageData.emailTo,
        },
      });
      if (!isValidEmail) {
        return NextResponse.json(
          { message: "there is no Admin for this email" },
          { status: 400 }
        );
      }
    } else if (messageData.receiverRole == "TEACHER") {
      const isValidEmail = await prisma.teacher.findUnique({
        where: {
          email: messageData.emailTo,
        },
      });
      if (!isValidEmail) {
        return NextResponse.json(
          { message: "there is no Teacher for this email" },
          { status: 400 }
        );
      }
    } else if (messageData.receiverRole == "STUDENT") {
      const isValidEmail = await prisma.student.findUnique({
        where: {
          email: messageData.emailTo,
        },
      });
      if (!isValidEmail) {
        return NextResponse.json(
          { message: "there is no Student for this email" },
          { status: 400 }
        );
      }
    }

    // Check If there is an old chats between them
    let chat = await prisma.chat.findFirst({
      where: {
        OR: [
          {
            email1: messageData.emailFrom,
            email2: messageData.emailTo,
          },
          {
            email1: messageData.emailTo,
            email2: messageData.emailFrom,
          },
        ],
      },
      select: {
        id: true,
      },
    });

    if (chat) {
      await prisma.message.create({
        data: {
          emailFrom: messageData.emailFrom,
          emailTo: messageData.emailTo,
          fromRole: messageData.senderRole as MessageRoles,
          toRole: messageData.receiverRole as MessageRoles,
          message: messageData.message,
          chatId: chat.id,
        },
      });
    } else {
      chat = await prisma.chat.create({
        data: {
          email1: messageData.emailFrom,
          email2: messageData.emailTo,
        },
      });
      await prisma.message.create({
        data: {
          emailFrom: messageData.emailFrom,
          emailTo: messageData.emailTo,
          fromRole: messageData.senderRole as MessageRoles,
          toRole: messageData.receiverRole as MessageRoles,
          message: messageData.message,
          chatId: chat.id,
        },
      });
    }

    return NextResponse.json({ chatId: chat.id }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
