import { authorizeUser } from "@/lib/AuthGuard/AuthorizationGuadr";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Start Authorization Guard
    const { isAuthorized, response, user } = await authorizeUser(req);
    if (!isAuthorized || !user) return response;
    // End Authorization Guard
    const { id } = await context.params;
    const annReply = await prisma.announcementReply.findUnique({
      where: {
        id,
      },
      select: {
        studentId: true,
      },
    });
    if (!annReply) {
      return NextResponse.json(
        { message: "invalid Reply Id" },
        {
          status: 404,
        }
      );
    }

    if (annReply.studentId != user.userId) {
      return NextResponse.json(
        { message: "unauthorized" },
        {
          status: 403,
        }
      );
    }

    await prisma.announcementReply.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      { message: "Reply has been deleted success" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error => " + error },
      { status: 500 }
    );
  }
}
