"use client";

import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import UnRegisterdCourseCard from "./UnRegisterdCourseCard";
import { GenderType } from "@/lib/globalTypes";
import LoadingSkeleton from "./LoadingSkeleton";
type Props = {
  token: string;
};
export type StudentCourseDataType = {
  id: string;
  maxCapacity: number;
  requiredCourses: { name: string }[];
  semester: {
    name: string;
    registerBegin: Date;
    registerDeadline: Date;
  };
  course_name: string;
  course_code: string;
  course_isElective: boolean;
  course_hours: number;
  registerd: number;
  course_department: {
    code: string;
    name: string;
  };
  isEnrolled: boolean;
  hall: string;
  teacher: {
    first_name: string;
    last_name: string;
    email: string;
    gender: GenderType;
    image: string;
  };
};
export type CourseOfferingResponse = {
  courses: StudentCourseDataType[];
  totalRegisterdHours: number;
};

async function getAvailabelCoursesToRegister(
  token: string
): Promise<CourseOfferingResponse> {
  try {
    const res = await axios.get(
      `${MainDomain}/api/get/student-course-offering`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
}
export default function RegisterAvailabelCourses({ token }: Props) {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["get_availabel_courses_for_register"],
    queryFn: () => getAvailabelCoursesToRegister(token),
  });

  if (isError && error) throw new Error(error.message);
  return (
    <div className="flex flex-col gap-7 w-full">
      {/* Header */}
      {data && (
        <div>
          <p className="text-xl font-bold">
            Available Courses ({data.courses.length})
          </p>
          <p>Register End: </p>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {isLoading ? (
          <LoadingSkeleton />
        ) : data && data.courses.length > 0 ? (
          data.courses.map((course) => (
            <UnRegisterdCourseCard
              token={token}
              key={course.id}
              courseData={course}
            />
          ))
        ) : (
          <div className="p-4 w-full h-28 rounded-md bg-Second-black text-low-white flex items-center justify-center">
            No courses availabel to register
          </div>
        )}
      </div>
    </div>
  );
}
