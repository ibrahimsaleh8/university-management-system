import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const isExist = await prisma.announcement.findUnique({
      where: {
        id,
      },
    });
    if (!isExist) {
      return NextResponse.json(
        { message: "Announcement doesn't exist" },
        { status: 404 }
      );
    }

    const replies = await prisma.announcementReply.findMany({
      where: { announcementId: id },
      select: {
        id: true,
        student: {
          select: { first_name: true, last_name: true, image: true, id: true },
        },
        content: true,
        created_at: true,
      },
    });

    const annReplies = replies.map((rep) => ({
      id: rep.id,
      student: {
        stdId: rep.student.id,
        name: `${rep.student.first_name} ${rep.student.last_name}`,
        image: rep.student.image,
      },
      content: rep.content,
      created_at: rep.created_at,
    }));
    return NextResponse.json(annReplies, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error => " + error },
      { status: 500 }
    );
  }
}
