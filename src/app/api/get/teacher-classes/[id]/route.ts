import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = await context.params;

    const teacher = await prisma.teacher.findUnique({ where: { id: +id } });
    if (!teacher) {
      return NextResponse.json(
        { message: "Invalid Teacher id" },
        { status: 404 }
      );
    }

    const classes = await prisma.class.findMany({
      where: {
        teacherId: +id,
      },
      select: {
        id: true,
        name: true,
        department: { select: { name: true } },
        _count: { select: { students: true, announcements: true } },
      },
    });
    const resClasses = classes.map((cl) => ({
      id: cl.id,
      name: cl.name,
      department: cl.department.name,
      students: cl._count.students,
      announcements: cl._count.announcements,
    }));
    return NextResponse.json(resClasses, { status: 200 });
  } catch (error) {
    console.error("Delete Schedule Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
