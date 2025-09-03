import { timeConverter } from "@/lib/TimeConverter";
import Link from "next/link";
type Props = {
  title: string;
  content: string;
  created_at: Date;
  annClass: {
    name: string;
  };
};
export default function LatestAnnCard({
  annClass,
  content,
  created_at,
  title,
}: Props) {
  return (
    <Link
      href={`/dashboard/student/classes/${annClass.name}`}
      className="bg-Second-Card-bg w-full rounded-sm text-sm p-3 flex flex-col gap-2 hover:bg-[#292929] duration-300">
      {/* Top */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <p className="font-bold capitalize">{title}</p>
        <p className="text-xs text-low-white">{timeConverter(created_at)}</p>
      </div>

      <p className="capitalize line-clamp-2">{content} </p>
    </Link>
  );
}
