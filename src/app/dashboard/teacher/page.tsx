import React from "react";
import ShowMainSchedual from "./_components/ShowMainSchedual";
import { cookies } from "next/headers";
import { MainDomain } from "@/variables/MainDomain";
import { EventDataType } from "../_components/Calender/CalenderTable";
import ShowLatestAnnouncmentsTeacher from "./_components/ShowLatestAnnouncmentsTeacher";

export default async function TeacherDashboardPage() {
  const token = (await (await cookies()).get("token")?.value) as string;

  const res = await fetch(`${MainDomain}/api/get/teacher-schedual`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      revalidate: 300,
    },
  });
  const schedualData: EventDataType[] = await res.json();
  return (
    <div className="flex flex-col gap-3">
      <ShowMainSchedual data={schedualData} />
      <ShowLatestAnnouncmentsTeacher token={token} />
    </div>
  );
}
