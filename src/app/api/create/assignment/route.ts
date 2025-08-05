import { TeacherAuthGuard } from "@/lib/AuthGuard/TeacherAuthGuard";
import {
  assignmentDataType,
  assignmentSchema,
} from "@/validation/AddAssignmentSchema";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Start Check Teacher Authorize
    const authVerify = await TeacherAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    // End Check Teacher Authorize
    const assignmentData = (await req.json()) as assignmentDataType;
    const validation = assignmentSchema.safeParse(assignmentData);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    if (!authVerify.user?.data) {
      return NextResponse.json(
        { message: "Unauthorized: teacher data missing" },
        { status: 401 }
      );
    }
    await prisma.assignment.create({
      data: {
        title: assignmentData.title,
        description: assignmentData.description,
        deadline: new Date(assignmentData.deadline),
        external_url: assignmentData.external_url || undefined,
        teacherId: authVerify.user.data.id,
        classId: assignmentData.classId,
      },
    });

    return NextResponse.json(
      { message: "Assignment has been created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server Error =>  " + error });
  }
}
