import prisma from "@/variables/PrismaVar";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
type AdminDataType = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};
export async function POST(request: NextRequest) {
  try {
    const data = (await request.json()) as AdminDataType;
    const checkExistens = await prisma.admin.findUnique({
      where: {
        email: data.email,
      },
    });
    if (checkExistens) {
      return NextResponse.json(
        { message: "User already exist" },
        { status: 400 }
      );
    }

    const newPassword = await bcrypt.hash(data.password, 10);
    const newUser = await prisma.admin.create({
      data: {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        password: newPassword,
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json({ message: "Server Error =>  " + error });
  }
}
