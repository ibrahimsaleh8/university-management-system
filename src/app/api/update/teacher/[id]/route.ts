import { AdminAuthGuard } from "@/lib/AuthGuard/AdminAuthGuard";
import {
  EditTeacherDataType,
  editTeacherSchema,
} from "@/validation/EditTeacherSchema";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  params: { params: Promise<{ id: string }> }
) {
  try {
    // Start Check Teacher Authorize
    const authVerify = await AdminAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    // End Check Teacher Authorize
    const { id } = await params.params;

    const teacherMainData = (await req.json()) as EditTeacherDataType & {
      image: string;
    };
    const validation = editTeacherSchema.safeParse(teacherMainData);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const teacher = await prisma.teacher.findUnique({
      where: {
        teacher_id: id,
      },
    });
    if (!teacher) {
      return NextResponse.json(
        { message: "Teacher Not Found" },
        {
          status: 404,
        }
      );
    }
    const {
      address,
      date_of_birth,
      email,
      first_name,
      gender,
      hire_date,
      image,
      last_name,
      phone,
      qualification,
    } = teacherMainData;
    await prisma.teacher.update({
      where: {
        teacher_id: id,
      },
      data: {
        address,
        date_of_birth,
        email,
        first_name,
        gender,
        hire_date,
        image,
        last_name,
        phone,
        qualification,
      },
    });
    return NextResponse.json(
      { message: "Teacher Updated Success" },
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
