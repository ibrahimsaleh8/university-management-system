import prisma from "@/variables/PrismaVar";

export const GetCourseMainData = async (courseId: string) => {
  const course = await prisma.courseOffering.findUnique({
    where: {
      id: courseId,
    },
    select: {
      course: {
        select: {
          name: true,
        },
      },
      teacher: {
        select: {
          first_name: true,
          last_name: true,
          gender: true,
        },
      },
      academicYear: {
        select: {
          year_label: true,
        },
      },
      maxCapacity: true,
      semester: {
        select: {
          name: true,
        },
      },
      _count: {
        select: {
          students: true,
        },
      },
    },
  });
  return course;
};
