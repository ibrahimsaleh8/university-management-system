import { GetUserFromEmail } from "@/lib/GetUserFromRoleAndEmail";
import { VerifyUserFromToken } from "@/lib/VerifyUserFromToken";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
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

    const chat = await prisma.chat.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        messages: {
          select: {
            id: true,
            message: true,
            isRead: true,
            createdAt: true,
            emailFrom: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        },
        email1: true,
        email2: true,
      },
    });

    if (!chat) {
      return NextResponse.json({ message: "invalid chat id" });
    }
    if (chat.email1 != user.email && chat.email2 != user.email) {
      return NextResponse.json(
        { message: "forbidden access" },
        { status: 403 }
      );
    }
    const anotheruser = await GetUserFromEmail(
      chat.email1 == user.email ? chat.email2 : chat.email1
    );
    const chatMsgs = chat.messages.map((msg) => ({
      id: msg.id,
      message: msg.message,
      isRead: msg.isRead,
      createdAt: msg.createdAt,
      sender: msg.emailFrom == user.email ? "you" : "another",
    }));
    const res = {
      id: chat.id,
      messages: chatMsgs,
      anotheruser,
    };
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error => " + error },
      { status: 500 }
    );
  }
}
