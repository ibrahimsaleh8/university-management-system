import { TeacherAuthGuard } from "@/lib/AuthGuard/TeacherAuthGuard";
import {
  updateAssignmentDataType,
  updateAssignmentSchema,
} from "@/validation/EditAssignmentSchema";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  params: { params: Promise<{ id: string }> }
) {
  try {
    // Start Check Teacher Authorize
    const authVerify = await TeacherAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    // End Check Teacher Authorize

    const { id } = await params.params;

    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }
    const assignData = (await req.json()) as updateAssignmentDataType;
    const validation = updateAssignmentSchema.safeParse(assignData);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const isExist = await prisma.assignment.findUnique({
      where: {
        id,
      },
    });
    if (!isExist) {
      return NextResponse.json(
        { message: "Assignment doesn't exist" },
        { status: 404 }
      );
    }

    await prisma.assignment.update({
      where: {
        id,
      },
      data: {
        title: assignData.title,
        description: assignData.description,
        deadline: assignData.deadline,
        external_url: assignData.external_url ?? undefined,
      },
    });

    return NextResponse.json(
      {
        message: "Assignment has been updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
