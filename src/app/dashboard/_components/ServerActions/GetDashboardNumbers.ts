"use server";

import prisma from "@/variables/PrismaVar";

export const GetDashboardNumbers = async () => {
  const students = await prisma.student.count();
  const male = await prisma.student.count({
    where: {
      gender: "MALE",
    },
  });
  const female = await prisma.student.count({
    where: {
      gender: "FEMALE",
    },
  });
  const firstGrade = await prisma.student.count({
    where: {
      academicYear: {
        level_number: 1,
      },
    },
  });
  const secondGrade = await prisma.student.count({
    where: {
      academicYear: {
        level_number: 2,
      },
    },
  });
  const thirdGrade = await prisma.student.count({
    where: {
      academicYear: {
        level_number: 3,
      },
    },
  });
  const fourthGrade = await prisma.student.count({
    where: {
      academicYear: {
        level_number: 4,
      },
    },
  });
  const graduated = await prisma.student.count({
    where: {
      academicYear: {
        level_number: 0,
      },
    },
  });

  const teachers = await prisma.teacher.count();
  const courses = await prisma.courseOffering.count({
    where: {
      semester: {
        isActive: true,
      },
    },
  });
  const enrollments = await prisma.studentEnrollment.count({
    where: {
      courseOffering: {
        semester: {
          isActive: true,
        },
      },
    },
  });

  return {
    students,
    teachers,
    courses,
    enrollments,
    male,
    female,
    firstGrade,
    secondGrade,
    thirdGrade,
    fourthGrade,
    graduated,
  };
};
