import { GetUserFromEmail } from "@/lib/GetUserFromRoleAndEmail";
import { VerifyUserFromToken } from "@/lib/VerifyUserFromToken";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
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

    const chats = await prisma.chat.findMany({
      where: {
        OR: [
          {
            email1: user.email,
          },
          {
            email2: user.email,
          },
        ],
      },
      select: {
        id: true,
        messages: {
          select: {
            id: true,
            message: true,
            isRead: true,
            emailFrom: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
        email1: true,
        email2: true,
        _count: {
          select: {
            messages: {
              where: {
                isRead: false,
                emailTo: user.email,
              },
            },
          },
        },
      },
    });

    const arrangedByUser = chats.map((ch) => {
      const currentUser = ch.email1 == user.email ? ch.email1 : ch.email2;
      const anotherUser = currentUser == ch.email1 ? ch.email2 : ch.email1;
      const messages = ch.messages.map((msg) => ({
        id: msg.id,
        message: msg.message,
        isRead: msg.isRead,
        sender: msg.emailFrom == currentUser ? "you" : "another",
      }));
      return {
        id: ch.id,
        messages: messages,
        userEmail: anotherUser,
        unreadMessages: ch._count.messages,
      };
    });
    const resChats = await Promise.all(
      arrangedByUser.map(async (ch) => {
        const [user] = await Promise.all([GetUserFromEmail(ch.userEmail)]);
        return {
          id: ch.id,
          messages: ch.messages,
          user,
          unreadMessages: ch.unreadMessages,
        };
      })
    );

    return NextResponse.json(resChats);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error " + error },
      { status: 500 }
    );
  }
}
