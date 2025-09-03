import { ExamStatusCalc } from "@/lib/ExamStatusCalc";
import prisma from "@/variables/PrismaVar";

export const GetDashboardStudentData = async (stdId: number) => {
  const now = new Date();

  const studentData = await prisma.student.findUnique({
    where: { id: stdId },
    select: {
      academicYear: { select: { year_label: true } },
      classes: {
        where: {
          class: { course: { semester: { isActive: true } } },
        },
        select: {
          class: {
            select: {
              assignments: {
                where: {
                  assignmentSubmission: { none: { studentId: stdId } },
                  deadline: { gt: now },
                },
                select: { id: true },
              },
              exams: {
                where: {
                  students: { none: { studentId: stdId } },
                },
                select: {
                  startDate: true,
                  endDate: true,
                  status: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!studentData) return null;

  const courses = await prisma.studentEnrollment.count({
    where: {
      studentId: stdId,
      courseOffering: { semester: { isActive: true } },
    },
  });

  const pendingAssignments =
    studentData.classes.reduce(
      (acc, cls) => acc + cls.class.assignments.length,
      0
    ) ?? 0;

  const pendingExams =
    studentData.classes
      .flatMap((cls) => cls.class.exams)
      .filter(
        (e) => ExamStatusCalc(e.startDate, e.endDate, e.status) === "SCHEDULED"
      ).length ?? 0;

  return {
    academicYear: studentData.academicYear?.year_label,
    enrolledCourses: courses,
    pendingAssignments,
    upcomingExams: pendingExams,
  };
};
