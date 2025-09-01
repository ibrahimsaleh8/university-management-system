import { MainDomain } from "@/variables/MainDomain";
import { cookies } from "next/headers";
import ShowCourses from "./_components/ShowCourses";

export type TeacherCoursesResponse = {
  id: string;
  courseName: string;
  courseHours: number;
  courseCode: string;
  courseIsElective: boolean;
  hall: string;
  acdemicYear: string;
  semester: {
    name: string;
    isActive: boolean;
  };
  maxCapacity: number;
  students: number;
};

export default async function CoursesTeacherPage() {
  const token = (await cookies()).get("token")?.value as string;
  const res = await fetch(`${MainDomain}/api/get/teacher-courses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const courses: TeacherCoursesResponse[] = await res.json();

  return <ShowCourses courses={courses} />;
}
