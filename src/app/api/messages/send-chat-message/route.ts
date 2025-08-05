import { GetUserFromEmail } from "@/lib/GetUserFromRoleAndEmail";
import { VerifyUserFromToken } from "@/lib/VerifyUserFromToken";
import {
  SendChatMessageType,
  sendMessageSchema,
} from "@/validation/SendMessageValidation";
import prisma from "@/variables/PrismaVar";
import { UserRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const headToken = await req.headers.get("Authorization");
    if (!headToken) {
      return NextResponse.json(
        { message: "token is missing" },
        { status: 400 }
      );
    }
    const token = headToken.split(" ")[1];
    const user = VerifyUserFromToken(token);

    if (!user) {
      return NextResponse.json({ message: "invalid token" }, { status: 400 });
    }

    const messageData = (await req.json()) as SendChatMessageType;

    const validation = sendMessageSchema.safeParse(messageData);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const chat = await prisma.chat.findUnique({
      where: {
        id: messageData.chatId,
      },
    });

    if (!chat) {
      return NextResponse.json({ message: "Chat Not found" }, { status: 404 });
    }

    if (chat.email1 != user.email && chat?.email2 != user.email) {
      return NextResponse.json(
        { message: "Forbidden Access" },
        { status: 403 }
      );
    }

    const anotherUser = await GetUserFromEmail(
      chat.email1 == user.email ? chat.email2 : chat.email1
    );
    if ("message" in anotherUser) {
      return NextResponse.json(
        { message: anotherUser.message },
        { status: 400 }
      );
    }

    // Create Message

    await prisma.message.create({
      data: {
        emailFrom: user.email,
        emailTo: anotherUser.email,
        fromRole: user.role.toUpperCase() as UserRole,
        toRole: anotherUser.role,
        message: messageData.message,
        isRead: false,
        chatId: chat.id,
      },
    });
    return NextResponse.json(
      { message: "Message has been created success" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error " + error },
      { status: 500 }
    );
  }
}
