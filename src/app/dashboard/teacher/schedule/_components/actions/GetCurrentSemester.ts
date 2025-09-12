import prisma from "@/variables/PrismaVar";

export const GetCurrentSemester = async () => {
  const semester = await prisma.semester.findFirst({
    where: {
      isActive: true,
    },
    select: {
      name: true,
    },
  });
  return semester;
};
