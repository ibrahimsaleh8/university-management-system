import { StudentAuthGuard } from "@/lib/AuthGuard/StudentAuthGard";
import prisma from "@/variables/PrismaVar";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    // Start Check Student Authorize
    const authVerify = await StudentAuthGuard(req);
    if (!authVerify.isAuthorized) return authVerify.response;
    if (!authVerify.user || !authVerify.user.data) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // End Check Student Authorize
    const { imageUrl } = (await req.json()) as {
      imageUrl: string;
    };

    if (!imageUrl) {
      return NextResponse.json(
        { message: "image url is required" },
        { status: 400 }
      );
    }

    const student = await prisma.student.findUnique({
      where: {
        email: authVerify.user.data.email,
      },
    });

    if (!student) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }

    await prisma.student.update({
      where: {
        id: student.id,
      },
      data: {
        image: imageUrl,
      },
    });

    revalidateTag("user_data");
    revalidateTag("student_data");

    return NextResponse.json({ imageUrl }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
