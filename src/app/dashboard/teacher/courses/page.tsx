import { MainDomain } from "@/variables/MainDomain";
import { cookies } from "next/headers";
import TeacherCourseCard from "./_components/TeacherCourseCard";

export type TeacherCoursesResponse = {
  id: string;
  courseName: string;
  courseHours: number;
  courseCode: string;
  hall: string;
  acdemicYear: string;
  semester: {
    name: string;
    isActive: boolean;
  };
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

  console.log(courses);

  return (
    <div className="flex flex-col gap-3">
      <p className="font-bold">Your Courses</p>

      {courses.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(360px , 1fr))",
            gap: "10px",
          }}>
          {courses.map((course) => (
            <TeacherCourseCard key={course.id} {...course} />
          ))}
        </div>
      ) : (
        <div className="w-full bg-Second-black rounded-md h-32 flex items-center justify-center text-low-white">
          No courses Found..
        </div>
      )}
    </div>
  );
}
