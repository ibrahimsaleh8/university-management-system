import prisma from "@/variables/PrismaVar";

export const GetDashboardTeacherCourses = async (teacherId: number) => {
  const coursesData = await prisma.courseOffering.findMany({
    where: {
      teacherId,
      semester: {
        isActive: true,
      },
    },
    select: {
      id: true,
      course: {
        select: {
          name: true,
          code: true,
        },
      },
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

  const courses = coursesData.map((course) => ({
    id: course.id,
    name: course.course.name,
    code: course.course.code,
    semester: course.semester.name,
    students: course._count.students,
  }));
  return courses;
};
