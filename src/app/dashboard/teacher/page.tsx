import React from "react";
import ShowMainSchedual from "./_components/ShowMainSchedual";
import { cookies } from "next/headers";
import { MainDomain } from "@/variables/MainDomain";
import { EventDataType } from "../_components/Calender/CalenderTable";
import { GetDashboardTeacherNumbers } from "../_components/ServerActions/GetDashboardTeacherNumbers";
import { VerifyUserFromToken } from "@/lib/VerifyUserFromToken";
import { redirect } from "next/navigation";
import ShowTeacherMainNumbers from "../_components/Overview/teacher/ShowTeacherMainNumbers";
import TeacherCoursesDashboard from "../_components/Overview/teacher/TeacherCoursesDashboard";
import { GetDashboardTeacherCourses } from "../_components/ServerActions/GetDashboardTeacherCourses";
import LatestEvents from "../_components/Overview/admin/LatestEvents";

export default async function TeacherDashboardPage() {
  const token = (await (await cookies()).get("token")?.value) as string;
  const teacher = await VerifyUserFromToken(token);
  if (!teacher) {
    redirect("/");
  }

  const res = await fetch(`${MainDomain}/api/get/teacher-schedual`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      revalidate: 300,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const schedualData: EventDataType[] = await res.json();

  const { activeClasses, activeCourses, totalStudents, upcomingExams } =
    await GetDashboardTeacherNumbers(teacher.userId);

  const coursesData = await GetDashboardTeacherCourses(teacher.userId);
  return (
    <div className="flex flex-col gap-3">
      <ShowTeacherMainNumbers
        activeClasses={activeClasses}
        activeCourses={activeCourses}
        totalStudents={totalStudents}
        upcomingExams={upcomingExams}
      />
      <div className="w-full flex gap-3 flex-col lg:flex-row">
        <TeacherCoursesDashboard courses={coursesData} />
        <div className="bg-Second-black rounded-2xl w-full relative">
          <div className="absolute right-[-1px] top-0 folder-clip-path lg:w-[20%] md:w-[30%] w-1/2 h-2 bg-Main-black p-2 rounded-tr-2xl"></div>
          <LatestEvents />
        </div>
      </div>

      <ShowMainSchedual data={schedualData} />
    </div>
  );
}
