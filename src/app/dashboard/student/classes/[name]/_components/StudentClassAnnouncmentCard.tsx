import { timeConverter } from "@/lib/TimeConverter";
import { StudentClassAnnouncmentsDataType } from "./ShowStudentAnnouncments";
import StudentAnnouncmentReplies from "./StudentAnnouncmentReplies";
import AnnouncmentReaction from "./AnnouncmentReaction";
import Image from "next/image";
import ShowAttachments from "@/app/dashboard/_components/ShowAttachments";

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
    <div className="w-full border border-soft-border black-box-shadow bg-main-dark rounded-md p-4 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Image
          src={data.teacher.image}
          alt="teacher image"
          width={1000}
          height={1000}
          className="w-12 h-12 object-cover object-center rounded-full"
        />
        <div className="flex flex-col gap-1">
          <p className="capitalize text-sm font-medium">
            Dr. {data.teacher.first_name} {data.teacher.last_name}
          </p>
          <p className="text-xs text-low-white">
            {timeConverter(data.created_at)}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-1">
        <p
          title={data.title}
          className="font-bold text-lg capitalize line-clamp-1 flex items-center gap-2">
          {data.title}
        </p>
        <p className="leading-7">{data.content} </p>
      </div>
      <ShowAttachments attachments={data.attachments} />

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
