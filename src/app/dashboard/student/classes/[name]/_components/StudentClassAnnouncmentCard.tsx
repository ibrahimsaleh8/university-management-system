import { timeConverter } from "@/lib/TimeConverter";
import { StudentClassAnnouncmentsDataType } from "./ShowStudentAnnouncments";
import StudentAnnouncmentReplies from "./StudentAnnouncmentReplies";
import { TfiAnnouncement } from "react-icons/tfi";
import AnnouncmentReaction from "./AnnouncmentReaction";

type Props = {
  data: StudentClassAnnouncmentsDataType;
  token: string;
  name: string;
};
export default function StudentClassAnnouncmentCard({
  data,
  token,
  name,
}: Props) {
  return (
    <div className="w-full border border-soft-border black-box-shadow bg-card-bg rounded-2xl p-4 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center gap-2 justify-between flex-wrap">
        <p
          title={data.title}
          className="font-bold text-lg capitalize line-clamp-1 flex items-center gap-2">
          <span className="w-8 h-8 bg-glass-green flex items-center justify-center rounded-full">
            <TfiAnnouncement className="w-4 h-4 text-main-text" />
          </span>
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
      <div className="mt-auto flex justify-between">
        <AnnouncmentReaction
          dislikes={data.dislikes}
          likes={data.likes}
          isDisLiked={data.isDisLiked}
          isLiked={data.isLiked}
          token={token}
          announcmentId={data.id}
          name={name}
        />

        <StudentAnnouncmentReplies
          announcmentId={data.id}
          repliesNumber={data.replies}
          token={token}
        />
      </div>
    </div>
  );
}
