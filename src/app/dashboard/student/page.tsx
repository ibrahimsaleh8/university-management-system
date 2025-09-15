import { cookies } from "next/headers";
import ShowStudentDashboardData from "../_components/Overview/student/ShowStudentDashboardData";
import { VerifyUserFromToken } from "@/lib/VerifyUserFromToken";
import { redirect } from "next/navigation";
import { GetDashboardStudentData } from "../_components/ServerActions/GetDashboardStudentData";
import ShowMainSchedual from "../teacher/_components/ShowMainSchedual";
import { MainDomain } from "@/variables/MainDomain";
import { EventDataType } from "../_components/Calender/CalenderTable";
import LatestEvents from "../_components/Overview/admin/LatestEvents";
import LatestAnnouncments from "../_components/Overview/student/LatestAnnouncments";
import { GetLatestStudentAnnouncments } from "../_components/ServerActions/GetLatestStudentAnnouncments";

export default async function StudentMainPage() {
  const token = (await (await cookies()).get("token")?.value) as string;
  const user = VerifyUserFromToken(token);
  if (!user) {
    redirect("/");
  }
  const stdData = await GetDashboardStudentData(user.userId);
  if (!stdData) {
    redirect("/");
  }

  const res = await fetch(`${MainDomain}/api/get/student-scheduals`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const schedualData: EventDataType[] = await res.json();
  const announcmnets = await GetLatestStudentAnnouncments(user.userId);
  return (
    <div className="flex flex-col gap-4">
      <ShowStudentDashboardData
        academicYear={stdData.academicYear as string}
        assignments={stdData.pendingAssignments}
        courses={stdData.enrolledCourses}
        exams={stdData.upcomingExams}
      />

      <div className="flex gap-3 flex-col lg:flex-row">
        <LatestAnnouncments announcments={announcmnets} />
        <div className="bg-Second-black rounded-2xl w-full relative">
          <div className="absolute right-[-1px] top-0 folder-clip-path lg:w-[20%] md:w-[30%] w-1/2 h-2 bg-Main-black p-2 rounded-tr-2xl"></div>
          <LatestEvents />
        </div>
      </div>
      <ShowMainSchedual data={schedualData} />
    </div>
  );
}
