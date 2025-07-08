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
    });
    if (!teacherClass) {
      return NextResponse.json(
        { message: "Class Name Not Found" },
        { status: 404 }
      );
    }
    const assignemtns = await prisma.assignment.findMany({
      where: {
        class: { name },
      },
      select: {
        id: true,
        created_at: true,
        title: true,
        deadline: true,
        description: true,
        external_url: true,
        _count: { select: { assignmentSubmission: true } },
      },
    });
    const assignemtnsResponse = assignemtns.map((assig) => ({
      id: assig.id,
      title: assig.title,
      description: assig.description,
      deadline: assig.deadline,
      external_url: assig.external_url,
      created_at: assig.created_at,
      submissions: assig._count.assignmentSubmission,
    }));
    return NextResponse.json(assignemtnsResponse, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server Error =>  " + error });
  }
}
