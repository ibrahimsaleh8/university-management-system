import { cookies } from "next/headers";
import ShowStudentCourses from "./_components/ShowStudentCourses";
import RegisterAvailabelCourses from "./_components/RegisterAvailabelCourses";
import { GetCurrentSemester } from "./_components/server action/GetCurrentSemester";
import { GetDateFromTime } from "@/lib/GetDateFromTime";
import { CalendarRange } from "lucide-react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Courses",
};
export default async function StudentCourses() {
  const token = (await cookies()).get("token")?.value as string;
  const semester = await GetCurrentSemester();
  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <p className="sm:text-3xl text-2xl font-bold">My Courses Enrollment</p>
        <p className="text-sm text-low-white">
          Manage your registered courses and explore new ones
        </p>
      </div>

      {semester && (
        <div className="bg-main-dark p-3 rounded-sm capitalize flex items-start gap-2">
          <div className="pt-1">
            <CalendarRange className="w-5 h-5 text-main-text" />
          </div>
          <div>
            <p className="text-lg font-bold">{semester.name}</p>
            <p className="text-sm text-low-white">
              Register of courses will begin at:{" "}
              {GetDateFromTime(semester.registerBegin)}
            </p>
            <p className="text-sm text-low-white">
              Deadline of register courses will be at:{" "}
              {GetDateFromTime(semester.registerDeadline)}
            </p>
          </div>
        </div>
      )}

      <div className="flex gap-10 w-full xl:flex-row flex-col">
        <div className="xl:w-[70%] w-full xl:min-w-96">
          <ShowStudentCourses token={token} />
        </div>
        <div className="xl:w-[30%] w-full xl:min-w-96">
          <RegisterAvailabelCourses token={token} />
        </div>
      </div>
    </div>
  );
}
