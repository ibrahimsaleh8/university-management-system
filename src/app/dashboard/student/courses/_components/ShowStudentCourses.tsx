"use client";
import TabelLoadingSkeleton from "@/app/dashboard/_components/TabelLoadingSkeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MainDomain } from "@/variables/MainDomain";
import { TotalCreditHoursCanRegister } from "@/variables/TotalCreditHoursCanRegister";
import { EnrollmentStatus } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PrintBtn from "./PrintBtn";
type Props = {
  token: string;
};
export type StudentCourseResponse = {
  id: string;
  status: EnrollmentStatus;
  finalGrade: number;
  enrollmentDate: string;
  courseName: string;
  courseCode: string;
  courseIsElective: boolean;
  courseHours: number;
  courseDepartment: {
    id: string;
    name: string;
    code: string;
  };
  semester: string;
  academicYear: string;
};

async function showStudentRegisterdCourses(
  token: string
): Promise<StudentCourseResponse[]> {
  const res = await axios.get(
    `${MainDomain}/api/get/student-registerd-courses`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}

export default function ShowStudentCourses({ token }: Props) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["show_registerd_courses"],
    queryFn: () => showStudentRegisterdCourses(token),
  });

  if (isError && error) throw new Error(error.message);
  return (
    <div className="flex flex-col gap-3 ">
      {isPending ? (
        <TabelLoadingSkeleton coloumnNumber={7} rowNumber={4} />
      ) : (
        data && (
          <div className="flex flex-col gap-2">
            {/* Header */}
            <div className="flex items-center gap-3 justify-between flex-wrap">
              <p className="font-medium text-sm">
                You Registered{" "}
                <span className="text-main-text font-bold">
                  {data.map((c) => c.courseHours).reduce((f, s) => f + s, 0)}
                </span>{" "}
                of{" "}
                <span className="text-main-text font-bold">
                  {TotalCreditHoursCanRegister}
                </span>{" "}
                Hours
              </p>
              <PrintBtn />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Hours</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Academic Year</TableHead>
                  <TableHead>Grade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.length > 0 ? (
                  data.map((course, i) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{i + 1}</TableCell>
                      <TableCell>
                        <p>
                          {course.courseName} -[{course.courseCode}]{" "}
                          {course.courseIsElective && (
                            <span className="text-low-white font-medium">
                              (Elective)
                            </span>
                          )}
                        </p>
                      </TableCell>
                      <TableCell className="capitalize">
                        {course.courseDepartment.name} -{" "}
                        <span className="uppercase">
                          {course.courseDepartment.code}
                        </span>
                      </TableCell>
                      <TableCell>{course.courseHours}</TableCell>
                      <TableCell>
                        {course.status == "ACTIVE" ? (
                          <p className="px-4 text-xs py-1.5 bg-blue-600 text-white w-fit rounded-md">
                            Active
                          </p>
                        ) : course.status == "COMPLETED" ? (
                          <p className="px-4 text-xs py-1.5 bg-main-text text-black w-fit rounded-md">
                            Completed
                          </p>
                        ) : (
                          <p className="px-4  text-xs py-1.5 bg-amber-400 text-black w-fit rounded-md">
                            Withdrawen
                          </p>
                        )}
                      </TableCell>
                      <TableCell className="text-xs capitalize">
                        {course.academicYear}
                      </TableCell>
                      <TableCell>{course.finalGrade ?? 0}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-low-white text-center">
                      No Courses Registerd Yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )
      )}
    </div>
  );
}
