import prisma from "@/variables/PrismaVar";
import { UserRole } from "@prisma/client";

export type UserFromEmailResult = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  image?: string;
  role: UserRole;
};

export const GetUserFromEmail = async (
  email: string
): Promise<UserFromEmailResult | { message: string }> => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { email },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
      },
    });
    if (admin) return { ...admin, role: "ADMIN" };

    const student = await prisma.student.findUnique({
      where: { email },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        image: true,
      },
    });
    if (student) return { ...student, role: "STUDENT" };

    const teacher = await prisma.teacher.findUnique({
      where: { email },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        image: true,
      },
    });

    if (teacher) return { ...teacher, role: "TEACHER" };

    return { message: "User not found" };
  } catch (error) {
    return { message: "Internal Server Error: " + error };
  }
};
