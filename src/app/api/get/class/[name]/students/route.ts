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
    const students = await prisma.class.findUnique({
      where: {
        name,
      },
      select: {
        students: {
          select: {
            student: {
              select: {
                id: true,
                first_name: true,
                last_name: true,
                image: true,
              },
            },
            classGrade: true,
          },
        },
      },
    });

    const studentsRes = students?.students.map((st) => ({
      id: st.student.id,
      name: `${st.student.first_name} ${st.student.last_name}`,
      image: st.student.image,
      grade: st.classGrade,
    }));

    return NextResponse.json(studentsRes, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server Error =>  " + error });
  }
}
