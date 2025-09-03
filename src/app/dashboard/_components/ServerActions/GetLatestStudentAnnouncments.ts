import prisma from "@/variables/PrismaVar";

export const GetLatestStudentAnnouncments = async (stdId: number) => {
  const announcments = await prisma.announcement.findMany({
    where: {
      class: {
        students: {
          some: {
            studentId: stdId,
          },
        },
        course: {
          semester: {
            isActive: true,
          },
        },
      },
    },
    select: {
      class: {
        select: {
          name: true,
        },
      },
      id: true,
      title: true,
      content: true,
      created_at: true,
    },
    orderBy: {
      created_at: "desc",
    },
    take: 5,
  });
  return announcments;
};
