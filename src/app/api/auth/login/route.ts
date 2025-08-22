import { LoginDataType } from "@/hooks/useLoginApiRequest";
import { CreateJwtToken } from "@/lib/CreateJwtToken";
import { SharedUserInfo } from "@/redux/actions/UserInfo";
import prisma from "@/variables/PrismaVar";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { role, email, password } = (await request.json()) as LoginDataType;
    console.log("Role", role);
    let findUser;
    if (role == "teacher") {
      findUser = await prisma.teacher.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
          email: true,
          first_name: true,
          last_name: true,
          password: true,
          image: true,
        },
      });
    } else if (role == "admin") {
      findUser = await prisma.admin.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
          email: true,
          first_name: true,
          last_name: true,
          password: true,
          image: true,
        },
      });
    } else {
      findUser = await prisma.student.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
          email: true,
          first_name: true,
          last_name: true,
          password: true,
          image: true,
        },
      });
    }

    if (!findUser) {
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });
    }

    const comparePassword = await bcrypt.compare(password, findUser.password);
    if (!comparePassword) {
      return NextResponse.json(
        { message: "Invalid Credentials" },
        { status: 401 }
      );
    }
    const responseUserInfo: SharedUserInfo = {
      id: findUser.id,
      email: findUser.email,
      first_name: findUser.first_name,
      last_name: findUser.last_name,
      role,
      image: findUser.image,
    };
    const response = NextResponse.json(responseUserInfo, { status: 200 });

    const token = CreateJwtToken({
      userId: findUser.id,
      email: findUser.email,
      first_name: findUser.first_name,
      last_name: findUser.last_name,
      role,
    });

    response.cookies.set("token", token, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return response;
  } catch (error) {
    return NextResponse.json({ message: "Server Error =>  " + error });
  }
}
