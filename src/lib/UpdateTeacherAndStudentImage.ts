"use server";

import prisma from "@/variables/PrismaVar";

export const UpdateTeacherAndStudentImage = async (
  image: string,
  email: string,
  role: "teacher" | "student"
) => {
  try {
    if (role == "teacher") {
      await prisma.teacher.update({
        where: {
          email,
        },
        data: {
          image,
        },
      });
    } else {
      await prisma.student.update({
        where: {
          email,
        },
        data: {
          image,
        },
      });
    }

    return { isSuccess: true };
  } catch (error) {
    console.error(error);

    return { isSuccess: false };
  }
};
