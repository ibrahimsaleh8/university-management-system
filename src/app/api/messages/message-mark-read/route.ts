import { VerifyUserFromToken } from "@/lib/VerifyUserFromToken";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const { id } = (await req.json()) as {
      id: string;
    };
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

    const message = await prisma.message.findUnique({
      where: {
        id,
      },
    });

    if (!message) {
      return NextResponse.json(
        { message: "Message not found" },
        { status: 404 }
      );
    }

    if (message.emailTo != user.email) {
      return NextResponse.json(
        { message: "forbidden action" },
        {
          status: 403,
        }
      );
    }

    await prisma.message.update({
      where: {
        id,
      },
      data: {
        isRead: true,
      },
    });
    return NextResponse.json({
      message: "Message has been marked as read success",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
