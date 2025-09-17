import { StudentAuthGuard } from "@/lib/AuthGuard/StudentAuthGard";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  params: { params: Promise<{ name: string }> }
) {
  try {
    // Start Check Student Authorize
    const authVerify = await StudentAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    if (!authVerify.user?.data) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // End Check Student Authorize
    const { name } = await params.params;
    const studentClass = await prisma.class.findUnique({
      where: {
        name,
      },
      select: {
        id: true,
        students: {
          select: {
            studentId: true,
          },
        },
      },
    });
    if (!studentClass) {
      return NextResponse.json({ message: "Class Not Found" }, { status: 404 });
    }
    const announcments = await prisma.announcement.findMany({
      where: {
        classId: studentClass.id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        created_at: true,
        _count: {
          select: {
            announcementReplies: true,
            likes: true,
            dislikes: true,
          },
        },
        likes: {
          where: {
            studentId: authVerify.user.data.id,
          },
        },
        dislikes: {
          where: {
            studentId: authVerify.user.data.id,
          },
        },
        teacher: {
          select: {
            first_name: true,
            last_name: true,
            image: true,
          },
        },
        attachment: {
          select: {
            id: true,
            name: true,
            url: true,
            type: true,
          },
        },
      },

      orderBy: {
        created_at: "desc",
      },
    });

    const dataRes = announcments.map((ann) => ({
      id: ann.id,
      title: ann.title,
      content: ann.content,
      created_at: ann.created_at,
      replies: ann._count.announcementReplies,
      likes: ann._count.likes,
      dislikes: ann._count.dislikes,
      isLiked: ann.likes.length > 0,
      isDisLiked: ann.dislikes.length > 0,
      teacher: ann.teacher,
      attachments: ann.attachment,
    }));

    return NextResponse.json(dataRes, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
