import prisma from "@/variables/PrismaVar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  params: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params.params;
    const student = await prisma.student.findUnique({
      where: {
        student_id: id,
      },
      select: {
        student_id: true,
        first_name: true,
        last_name: true,
        address: true,
        gender: true,
        date_of_birth: true,
        email: true,
        phone: true,
        image: true,
        courses: {
          select: {
            id: true,
            status: true,
            finalGrade: true,
            enrollmentDate: true,
            courseOffering: {
              select: {
                course: {
                  select: {
                    name: true,
                    code: true,
                  },
                },
              },
            },
          },
        },
        academicYear: {
          select: {
            year_label: true,
          },
        },
        department: {
          select: {
            name: true,
            code: true,
          },
        },
        classes: {
          select: {
            classGrade: true,
            class: {
              select: {
                name: true,
                teacher: {
                  select: {
                    first_name: true,
                    last_name: true,
                    image: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!student) {
      return NextResponse.json(
        { message: "Student Not Found" },
        { status: 404 }
      );
    }

    const studentRes = {
      student_id: student.student_id,
      first_name: student.first_name,
      last_name: student.last_name,
      address: student.address,
      gender: student.gender,
      date_of_birth: student.date_of_birth,
      email: student.email,
      phone: student.phone,
      image: student.image,
      courses: student.courses.map((course) => ({
        id: course.id,
        name: course.courseOffering.course.name,
        code: course.courseOffering.course.code,
        status: course.status,
        finalGrade: course.finalGrade,
        enrollmentDate: course.enrollmentDate,
      })),
      academicYear: student.academicYear?.year_label,
      department: student.department,
      classes: student.classes.map((cls) => ({
        name: cls.class.name,
        classGrade: cls.classGrade,
        teacher: cls.class.teacher,
      })),
    };

    return NextResponse.json(studentRes, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error => " + error },
      { status: 500 }
    );
  }
}
