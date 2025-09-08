import prisma from "@/variables/PrismaVar";

export const GetStudentSchedual = async (studentId: string) => {
  const schedules = await prisma.courseSchedule.findMany({
    where: {
      course: {
        students: {
          some: {
            student: {
              student_id: studentId,
            },
          },
        },
        semester: { isActive: true },
      },
    },
    select: {
      id: true,
      course: {
        select: {
          hall: true,
          course: {
            select: {
              name: true,
            },
          },
        },
      },
      academicYear: { select: { year_label: true } },
      dayOfWeek: true,
      startTime: true,
      teacher: { select: { first_name: true, last_name: true } },
    },
  });

  const scheduals = schedules.map((sched) => ({
    id: sched.id,
    day: sched.dayOfWeek.toLowerCase(),
    time: sched.startTime,
    title: sched.course.course.name,
    hall: sched.course.hall,
    academicYear: sched.academicYear.year_label,
    teacher: `${sched.teacher.first_name} ${sched.teacher.last_name}`,
  }));

  return scheduals;
};
