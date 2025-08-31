import prisma from "@/variables/PrismaVar";

export const GetLatestEvents = async () => {
  const events = await prisma.event.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      time: true,
      location: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
  });
  return events;
};
