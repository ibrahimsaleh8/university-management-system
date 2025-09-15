import { MainDomain } from "@/variables/MainDomain";
import SemesterWithCoursesCard from "./_components/SemesterWithCoursesCard";
import { cookies } from "next/headers";
import { EnrollmentStatus } from "@/lib/globalTypes";
export type StudentCoursesResponse = {
  semester: {
    name: string;
    isActive: boolean;
  };
  courses: {
    id: string;
    grade: number | null;
    status: EnrollmentStatus;
    name: string;
    code: string;
    hours: number;
    letter: string;
    gpa: number;
  }[];
  totalHours: number;
  cumulativeGpa: number;
};

export default async function StudentGrades() {
  const token = (await cookies()).get("token")?.value as string;

  const res = await fetch(`${MainDomain}/api/get/student-grades`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["user_grades"],
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data: StudentCoursesResponse[] = await res.json();
  return (
    <div className="flex flex-col gap-5 p-3">
      <p className="font-bold text-3xl">
        My <span className="text-main-text">Courses & Grades</span>
      </p>

      <div className="flex flex-col gap-10">
        {data.length > 0 ? (
          data.map((semester) => (
            <SemesterWithCoursesCard
              key={semester.semester.name}
              data={semester}
            />
          ))
        ) : (
          <div className="w-full h-32 bg-Second-black rounded-2xl text-low-white flex items-center justify-center">
            You {"didn't"} register at any courses Yet
          </div>
        )}
      </div>
    </div>
  );
}
