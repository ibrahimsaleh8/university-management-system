import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  context: { params: { name: string } }
) {
  try {
    const { name } = await context.params;

    const teacherClass = await prisma.class.findUnique({
      where: {
        name,
      },
      select: {
        announcements: {
          select: {
            id: true,
            title: true,
            content: true,
            _count: { select: { announcementReplies: true } },
            created_at: true,
          },
        },
        course: {
          select: { id: true, course: { select: { name: true, code: true } } },
        },
        assignments: {
          select: {
            id: true,
            created_at: true,
            title: true,
            deadline: true,
            description: true,
            external_url: true,
            _count: { select: { assignmentSubmission: true } },
          },
        },
        exams: {
          select: {
            id: true,
            title: true,
            startDate: true,
            endDate: true,
            status: true,
          },
        },
        _count: {
          select: {
            students: true,
          },
        },
      },
    });

    if (!teacherClass) {
      return NextResponse.json(
        { message: "Class Name Not Found" },
        { status: 404 }
      );
    }
    const classData = {
      course: {
        id: teacherClass?.course.id,
        name: teacherClass?.course.course.name,
      },
      announcements: teacherClass.announcements.map((an) => ({
        id: an.id,
        title: an.title,
        content: an.content,
        created_at: an.created_at,
        replies: an._count.announcementReplies,
      })),
      assignments: teacherClass.assignments.map((assig) => ({
        id: assig.id,
        title: assig.title,
        description: assig.description,
        deadline: assig.deadline,
        external_url: assig.external_url,
        created_at: assig.created_at,
        submissions: assig._count.assignmentSubmission,
      })),
      exams: teacherClass.exams,
      students: teacherClass._count.students,
    };

    return NextResponse.json(classData, { status: 200 });
  } catch (error) {
    console.error("Get Class Data Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
