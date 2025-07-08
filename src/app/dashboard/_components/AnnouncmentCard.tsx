"use client";
import { timeConverter } from "@/lib/TimeConverter";
import AnnouncmentOperations from "../teacher/classes/_components/AnnouncmentOperations";
import ShowAnnouncementReplies from "../teacher/classes/_components/ShowAnnouncementReplies";
import OperationsDropdown from "./OperationsDropdown";
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
    <div className="bg-Second-black border overflow-hidden border-soft-border w-full p-2 px-4 pb-4 rounded-sm flex flex-col gap-3">
      {/* Header */}
      <div className="w-full flex items-center gap-4">
        <p
          title="title"
          className="text-lg font-medium capitalize line-clamp-1">
          {title}
        </p>
        <p className="ml-auto text-xs text-low-white">{ann_created_at}</p>
      </div>
      {/* Content */}
      <div className="pb-1">
        <p className="text-sm">{content}</p>
      </div>
      {/* Bottom */}
      <div className="mt-auto flex sm:items-center justify-between gap-4 flex-col sm:flex-row">
        <ShowAnnouncementReplies annId={id} replies={replies} />

        {/* Operations */}
        <div className="flex items-center gap-4 ">
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
