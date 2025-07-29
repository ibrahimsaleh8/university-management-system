"use client";

import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import StudentAvailabelCoursesTable from "./StudentAvailabelCoursesTable";
type Props = {
  token: string;
};
export type CourseOfferingResponse = {
  id: string;
  maxCapacity: number;
  requiredCourses: { name: string }[];
  semester: string;
  course_name: string;
  course_code: string;
  course_isElective: boolean;
  course_hours: number;
  registerd: number;
  course_department: string;
};

async function getAvailabelCoursesToRegister(
  token: string
): Promise<CourseOfferingResponse[]> {
  const res = await axios.get(`${MainDomain}/api/get/student-course-offering`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export default function RegisterAvailabelCourses({ token }: Props) {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["get_availabel_courses_for_register"],
    queryFn: () => getAvailabelCoursesToRegister(token),
  });
  if (isError && error) throw new Error(error.message);
  return isLoading ? (
    <>Loading</>
  ) : (
    data && (
      <div className="flex flex-col gap-2">
        <p className="font-medium text-low-white">
          Courses that You Can Register It
        </p>
        <StudentAvailabelCoursesTable courseData={data} token={token} />
      </div>
    )
  );
}
