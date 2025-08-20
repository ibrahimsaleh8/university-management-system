import BackButton from "@/app/dashboard/_components/forms/BackButton";
import { timeConverter } from "@/lib/TimeConverter";
import { MainDomain } from "@/variables/MainDomain";
import { BookOpenCheck, CalendarClock, FileCheck2, Link } from "lucide-react";
import { cookies } from "next/headers";
import AssignmentSmallInfo from "./_components/AssignmentSmallInfo";
import Image from "next/image";
import StudentSubmissionsTable from "./_components/StudentSubmissionsTable";
export type AssignmentResponse = {
  title: string;
  description: string;
  deadline: Date;
  external_url: string | null;
  teacher: {
    first_name: string;
    last_name: string;
    email: string;
    image: string;
  };
  className: string;
  classStudents: number;
  submission: number;
};
export default async function AssignmentSubmissonsById({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const token = (await cookies()).get("token")?.value as string;

  const res = await fetch(`${MainDomain}/api/get/assignment/${id}/main-data`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const assignmentMainData: AssignmentResponse = await res.json();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <BackButton withText={false} />
        <h1 className="text-2xl font-bold">{assignmentMainData.title}</h1>
      </div>

      <div className="w-full bg-Second-black rounded-2xl border sm:p-5 p-3 flex flex-col gap-5 sm:pb-6 border-soft-border">
        {/* Top */}
        <div className="flex gap-4 justify-between items-center flex-wrap">
          <AssignmentSmallInfo
            icon={<CalendarClock className="w-7 h-7 text-main-text" />}
            title="Deadline"
            value={timeConverter(assignmentMainData.deadline)}
          />
          <AssignmentSmallInfo
            icon={
              <Image
                alt="Teacher image"
                src={assignmentMainData.teacher.image}
                width={100}
                height={100}
                className="rounded-md"
              />
            }
            title="Teacher"
            value={`${assignmentMainData.teacher.first_name} ${assignmentMainData.teacher.last_name}`}
          />
          <AssignmentSmallInfo
            icon={<BookOpenCheck className="w-7 h-7 text-main-text" />}
            title="Class"
            value={assignmentMainData.className}
          />
          <AssignmentSmallInfo
            icon={<FileCheck2 className="w-7 h-7 text-main-text" />}
            title="Submissions"
            value={`${assignmentMainData.submission} / ${assignmentMainData.classStudents}`}
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <p className="font-medium">Description</p>
          <p className="text-low-white">{assignmentMainData.description}</p>
          {assignmentMainData.external_url && (
            <a
              className="flex items-center gap-3 mt-3 hover:underline text-main-text font-medium"
              href={assignmentMainData.external_url}
              target="_blank">
              <Link className="w-4 h-4" /> External url
            </a>
          )}
        </div>
      </div>

      {/* Table */}
      <StudentSubmissionsTable assignmentId={id} token={token} />
    </div>
  );
}
