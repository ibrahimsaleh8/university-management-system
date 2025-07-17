import { timeConverter } from "@/lib/TimeConverter";
import Link from "next/link";
import { LatestAnnouncementType } from "./ShowLatestAnnouncmentsTeacher";
type data = Omit<LatestAnnouncementType, "id">;
export default function LatestAnnouncmentsCard({
  content,
  created_at,
  title,
  className,
}: data) {
  return (
    <div className="w-full text-sm p-3 bg-Second-black rounded-lg flex flex-col gap-3">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <p className="font-bold">{title}</p>
        <p className="text-xs text-low-white">{timeConverter(created_at)}</p>
      </div>
      <p className="line-clamp-3">{content} </p>
      <Link
        href={`/dashboard/teacher/classes/${className}`}
        className="px-4 py-1 w-fit ml-auto rounded-md bg-main-text text-black text-sm">
        Show
      </Link>
    </div>
  );
}
