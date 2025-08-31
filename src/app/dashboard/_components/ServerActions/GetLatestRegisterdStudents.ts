import prisma from "@/variables/PrismaVar";

export const GetLatestRegisterdStudents = async () => {
  const students = await prisma.student.findMany({
    take: 4,
    select: {
      id: true,
      first_name: true,
      last_name: true,
      created_at: true,
      image: true,
      department: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return students;
};
