import { AdminAuthGuard } from "@/lib/AuthGuard/AdminAuthGuard";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  params: { params: Promise<{ id: string }> }
) {
  try {
    // Start Check Teacher Authorize
    const authVerify = await AdminAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    // End Check Teacher Authorize

    const { id } = await params.params;
    const teacher = await prisma.teacher.findUnique({
      where: {
        teacher_id: id,
      },
    });
    if (!teacher) {
      return NextResponse.json(
        { message: "Teacher Not Found" },
        { status: 404 }
      );
    }

    // Start deleting related data

    await prisma.$transaction([
      prisma.courseSchedule.deleteMany({
        where: { teacherId: teacher.id },
      }),

      // --- Announcements ---
      prisma.announcementReply.deleteMany({
        where: { announcement: { teacherId: teacher.id } },
      }),
      prisma.announcementLike.deleteMany({
        where: { announcement: { teacherId: teacher.id } },
      }),
      prisma.announcementDisLike.deleteMany({
        where: { announcement: { teacherId: teacher.id } },
      }),
      prisma.announcement.deleteMany({
        where: { teacherId: teacher.id },
      }),

      // --- Assignments & Exams ---
      prisma.assignment.deleteMany({
        where: { teacherId: teacher.id },
      }),
      prisma.exam.deleteMany({
        where: { teacherId: teacher.id },
      }),

      // --- Classes ---
      prisma.studentClass.deleteMany({
        where: { class: { teacherId: teacher.id } },
      }),
      prisma.class.deleteMany({
        where: { teacherId: teacher.id },
      }),

      // --- Course Offerings ---
      prisma.studentEnrollment.deleteMany({
        where: {
          courseOffering: { teacherId: teacher.id }, // delete enrollments first
        },
      }),
      prisma.courseOffering.deleteMany({
        where: { teacherId: teacher.id },
      }),

      // --- Finally, delete teacher ---
      prisma.teacher.delete({
        where: { teacher_id: id },
      }),
    ]);

    return NextResponse.json(
      { message: "Teacher Deleted Success" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error => " + error },
      { status: 500 }
    );
  }
}
