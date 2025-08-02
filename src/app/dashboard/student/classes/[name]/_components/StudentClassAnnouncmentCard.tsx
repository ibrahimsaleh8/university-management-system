import { Button } from "@/components/ui/button";
import { timeConverter } from "@/lib/TimeConverter";
import { MessageSquareMore } from "lucide-react";
import { StudentClassAnnouncmentsDataType } from "./ShowStudentAnnouncments";

type Props = {
  data: StudentClassAnnouncmentsDataType;
  token: string;
};
export default function StudentClassAnnouncmentCard({ data }: Props) {
  return (
    <div className="max-w-[45rem] border border-soft-border black-box-shadow bg-card-bg rounded-2xl p-4 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center gap-2 justify-between flex-wrap">
        <p
          title={data.title}
          className="font-bold text-lg capitalize line-clamp-1">
          {data.title}
        </p>
        <p className="text-xs text-low-white">
          {timeConverter(data.created_at)}
        </p>
      </div>
      {/* Body */}
      <div>
        <p className="leading-7">{data.content} </p>
      </div>
      {/* Bottom */}
      <div className="mt-auto flex justify-end">
        <Button className="bg-glass-main-text text-main-text hover:bg-Main-black duration-300">
          <MessageSquareMore className="w-5 h-5 " />
          Replies ({data.replies})
        </Button>
      </div>
    </div>
  );
}
