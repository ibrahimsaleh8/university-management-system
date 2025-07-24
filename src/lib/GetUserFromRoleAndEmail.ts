import prisma from "@/variables/PrismaVar";

export const GetUserFromEmail = async (email: string) => {
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
    if (admin) return admin;

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
    if (student) return student;

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
    return teacher;
  } catch (error) {
    return { message: "Internal Server Error: " + error };
  }
};
