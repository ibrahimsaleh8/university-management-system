"use client";

import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import StudentAvailabelCoursesTable from "./StudentAvailabelCoursesTable";
import TabelLoadingSkeleton from "@/app/dashboard/_components/TabelLoadingSkeleton";
type Props = {
  token: string;
};
export type CourseOfferingResponse = {
  courses: {
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
    course_department: string;
    isEnrolled: boolean;
  }[];
  totalRegisterdHours: number;
};

async function getAvailabelCoursesToRegister(
  token: string
): Promise<CourseOfferingResponse> {
  const res = await axios.get(`${MainDomain}/api/get/student-course-offering`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}
// show_registerd_courses
export default function RegisterAvailabelCourses({ token }: Props) {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["get_availabel_courses_for_register"],
    queryFn: () => getAvailabelCoursesToRegister(token),
  });
  console.log("course offering", data);
  if (isError && error) throw new Error(error.message);
  return (
    <div className="flex flex-col gap-2">
      {isLoading ? (
        <TabelLoadingSkeleton coloumnNumber={7} rowNumber={4} />
      ) : data && data.courses.length > 0 ? (
        <StudentAvailabelCoursesTable courseData={data} token={token} />
      ) : (
        <div className="p-4 w-full h-28 rounded-md bg-Second-black text-low-white flex items-center justify-center">
          No courses availabel to register
        </div>
      )}
    </div>
  );
}
