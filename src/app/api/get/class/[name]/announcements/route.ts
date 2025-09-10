import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await context.params;
    const teacherClass = await prisma.class.findUnique({
      where: {
        name,
      },
    });
    if (!teacherClass) {
      return NextResponse.json(
        { message: "Class Name Not Found" },
        { status: 404 }
      );
    }
    const announcmnets = await prisma.announcement.findMany({
      where: {
        class: { name },
      },
      select: {
        id: true,
        title: true,
        content: true,
        created_at: true,
        _count: {
          select: { announcementReplies: true, likes: true, dislikes: true },
        },
        teacher: {
          select: {
            first_name: true,
            last_name: true,
            image: true,
          },
        },
        AnnouncementAttachment: {
          select: {
            id: true,
            name: true,
            type: true,
            url: true,
          },
        },
      },
      orderBy: { created_at: "desc" },
    });
    const announcmnetsData = announcmnets.map((ann) => ({
      id: ann.id,
      title: ann.title,
      content: ann.content,
      created_at: ann.created_at,
      replies: ann._count.announcementReplies,
      likes: ann._count.likes,
      dislikes: ann._count.dislikes,
      teacher: ann.teacher,
      attachments: ann.AnnouncementAttachment,
    }));

    return NextResponse.json(announcmnetsData, { status: 200 });
  } catch (error) {
    console.error("Get Class Data Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
