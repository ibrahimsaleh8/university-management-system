import { ExamStatusCalc } from "@/lib/ExamStatusCalc";
import prisma from "@/variables/PrismaVar";

export const GetDashboardTeacherNumbers = async (teacherId: number) => {
  const [activeCourses, allExams, groupedStudents, activeClasses] =
    await Promise.all([
      prisma.courseOffering.count({
        where: { teacherId: teacherId, semester: { isActive: true } },
      }),
      prisma.exam.findMany({
        where: {
          teacherId: teacherId,
          course: { semester: { isActive: true } },
        },
        select: { startDate: true, endDate: true, status: true },
      }),
      prisma.studentEnrollment.groupBy({
        by: ["studentId"],
        where: {
          courseOffering: {
            teacherId: teacherId,
            semester: { isActive: true },
          },
        },
      }),
      prisma.class.count({
        where: {
          teacherId: teacherId,
          course: { semester: { isActive: true } },
        },
      }),
    ]);

  const totalStudents = groupedStudents.length;

  const upcomingExams = allExams.filter(
    (ex) => ExamStatusCalc(ex.startDate, ex.endDate, ex.status) === "SCHEDULED"
  ).length;

  return { activeCourses, upcomingExams, totalStudents, activeClasses };
};

/*
  Active Courses
  Upcoming Exams
  Total Students
  Active Classes
*/
