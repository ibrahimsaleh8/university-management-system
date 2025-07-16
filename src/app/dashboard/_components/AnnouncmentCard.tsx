"use client";
import { timeConverter } from "@/lib/TimeConverter";
import AnnouncmentOperations from "../teacher/classes/_components/AnnouncmentOperations";
import ShowAnnouncementReplies from "../teacher/classes/_components/ShowAnnouncementReplies";
import OperationsDropdown from "./OperationsDropdown";
import { TfiAnnouncement } from "react-icons/tfi";
export type AnnouncementInfoType = {
  id: string;
  title: string;
  content: string;
  created_at: Date;
  replies: number;
  token?: string;
  className?: string;
};

export default function AnnouncmentCard({
  content,
  created_at,
  replies,
  title,
  id,
  token,
  className,
}: AnnouncementInfoType) {
  const ann_created_at = timeConverter(created_at);

  return (
    <div className="bg-Second-black black-box-shadow overflow-hidden w-full p-2 px-4 pb-4 rounded-sm flex flex-col gap-3">
      {/* Header */}
      <div className="w-full flex items-center gap-4 flex-wrap">
        <p
          title="title"
          className="text-lg font-medium flex items-center gap-2 capitalize line-clamp-1">
          <span>
            <TfiAnnouncement className="w-5 h-5 text-main-text" />
          </span>
          {title}
        </p>
        <p className="ml-auto text-xs text-low-white">{ann_created_at}</p>
      </div>
      {/* Content */}
      <div className="pb-1">
        <p className="text-sm">{content}</p>
      </div>
      {/* Bottom */}
      <div className="mt-auto flex sm:items-center justify-between gap-4 ">
        <ShowAnnouncementReplies annId={id} replies={replies} />

        {/* Operations */}
        <div className="flex items-center gap-4 ml-auto">
          <OperationsDropdown
            components={[
              <AnnouncmentOperations
                annId={id}
                content={content}
                title={title}
                type="edit"
                token={token ?? ""}
                className={className}
                key={1}
              />,
              <AnnouncmentOperations
                annId={id}
                content={content}
                title={title}
                type="delete"
                token={token ?? ""}
                className={className}
                key={2}
              />,
            ]}
          />
        </div>
      </div>
    </div>
  );
}
