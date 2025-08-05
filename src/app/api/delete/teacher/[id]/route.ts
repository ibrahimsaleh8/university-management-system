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

    await prisma.courseSchedule.deleteMany({
      where: { teacherId: teacher.id },
    });

    await prisma.announcement.deleteMany({
      where: { teacherId: teacher.id },
    });

    await prisma.assignment.deleteMany({
      where: { teacherId: teacher.id },
    });

    await prisma.exam.deleteMany({
      where: { teacherId: teacher.id },
    });

    await prisma.class.deleteMany({
      where: { teacherId: teacher.id },
    });

    await prisma.courseOffering.deleteMany({
      where: { teacherId: teacher.id },
    });

    await prisma.departmentTeacher.deleteMany({
      where: { teacherId: teacher.id },
    });

    await prisma.teacher.delete({
      where: { teacher_id: id },
    });

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
