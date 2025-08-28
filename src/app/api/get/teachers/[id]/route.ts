import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  params: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params.params;

    const teacher = await prisma.teacher.findUnique({
      where: {
        teacher_id: id,
      },
      select: {
        first_name: true,
        last_name: true,
        address: true,
        gender: true,
        date_of_birth: true,
        email: true,
        hire_date: true,
        image: true,
        phone: true,
        qualification: true,
        courses: {
          select: {
            semester: {
              select: {
                name: true,
                isActive: true,
              },
            },
            course: {
              select: {
                id: true,
                name: true,
                department: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
          where: {
            semester: {
              isActive: { equals: true },
            },
          },
        },
        schedules: {
          select: {
            id: true,
            course: {
              select: { course: { select: { name: true } }, hall: true },
            },
            academicYear: { select: { year_label: true } },
            dayOfWeek: true,
            startTime: true,
            teacher: { select: { first_name: true, last_name: true } },
          },
        },
        departments: {
          select: {
            department: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
    if (!teacher) {
      return NextResponse.json(
        { message: "Teacher not found" },
        { status: 404 }
      );
    }

    const teacherRes = {
      teacher_id: id,
      first_name: teacher.first_name,
      last_name: teacher.last_name,
      email: teacher.email,
      image: teacher.image,
      gender: teacher.gender,
      address: teacher.address,
      date_of_birth: teacher.date_of_birth,
      hire_date: teacher.hire_date,
      phone: teacher.phone,
      qualification: teacher.qualification,
      courses: teacher.courses.map((course) => ({
        id: course.course.name,
        name: course.course.name,
        department: course.course.department?.name,
        semester: course.semester,
      })),
      schedules: teacher.schedules.map((sched) => ({
        id: sched.id,
        day: sched.dayOfWeek.toLowerCase(),
        time: sched.startTime,
        title: sched.course.course.name,
        hall: sched.course.hall,
        academicYear: sched.academicYear.year_label,
        teacher: `${sched.teacher.first_name} ${sched.teacher.last_name}`,
      })),
      departments: teacher.departments.map((d) => d.department),
    };

    return NextResponse.json(teacherRes, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server Error =>  " + error });
  }
}
