import { VerifyUserFromToken } from "@/lib/VerifyUserFromToken";
import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 400 }
      );
    }
    const token = authHeader.split(" ")[1];

    const user = VerifyUserFromToken(token);
    if (!user) {
      return NextResponse.json({ message: "inavlid token" }, { status: 400 });
    }
    let userData;
    if (user.role == "admin") {
      userData = await prisma.admin.findUnique({
        where: {
          email: user.email,
        },
        select: {
          id: true,
          email: true,
          first_name: true,
          last_name: true,
        },
      });
      userData = {
        ...userData,
        image:
          "https://res.cloudinary.com/dnriyuqpv/image/upload/v1753802858/students/jt2tgm0xwku2umqlv6jb.png",
      };
    } else if (user.role == "student") {
      userData = await prisma.student.findUnique({
        where: {
          email: user.email,
        },
        select: {
          id: true,
          email: true,
          first_name: true,
          last_name: true,
          image: true,
        },
      });
    } else {
      userData = await prisma.teacher.findUnique({
        where: {
          email: user.email,
        },
        select: {
          id: true,
          email: true,
          first_name: true,
          last_name: true,
          image: true,
        },
      });
    }
    return NextResponse.json({ ...userData, role: user.role });
  } catch (error) {
    return NextResponse.json({ message: "Server Error =>  " + error });
  }
}
