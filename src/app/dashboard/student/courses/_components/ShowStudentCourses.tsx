"use client";
import { MainDomain } from "@/variables/MainDomain";
import { EnrollmentStatus } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import RegisterdCourseCard from "./RegisterdCourseCard";
import LoadingSkeleton from "./LoadingSkeleton";
type Props = {
  token: string;
};
export type StudentCourseResponse = {
  id: string;
  status: EnrollmentStatus;
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
  hall: string;
  courseSchedual: {
    dayOfWeek: string;
    startTime: string;
  };
  teacher: {
    first_name: string;
    last_name: string;
    gender: string;
    image: string;
    email: string;
  };
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
    <div className="flex flex-col gap-7 w-full">
      {/* Header */}
      {data && (
        <div className="flex items-center gap-2 flex-wrap justify-between">
          <p className="text-xl font-bold">
            Registered Classes ({data.length})
          </p>
          <p className="bg-[#1C2409] text-main-text w-fit px-3 py-0.5 rounded-full text-sm">
            {data.map((c) => c.courseHours).reduce((f, s) => f + s, 0)} Hours
          </p>
        </div>
      )}

      {isPending ? (
        <LoadingSkeleton />
      ) : data && data.length > 0 ? (
        data.map((course) => (
          <RegisterdCourseCard key={course.id} courseData={course} />
        ))
      ) : (
        <div className="bg-Second-black w-full h-32 flex items-center justify-center text-low-white text-lg rounded-lg">
          No Courses Registerd Yet ...
        </div>
      )}
    </div>
  );
}
