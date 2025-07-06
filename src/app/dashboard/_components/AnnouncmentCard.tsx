"use client";
import { MessageSquareQuote, Trash2 } from "lucide-react";
import AnnouncmentOperations from "../teacher/classes/_components/AnnouncmentOperations";
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
  const ann_created_at = `${new Date(created_at).getDate()}/${
    new Date(created_at).getMonth() + 1
  }/${new Date(created_at).getFullYear()} - ${new Date(
    created_at
  ).toLocaleTimeString()}`;

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
        <p className="flex items-center gap-1 border border-white hover:bg-white hover:text-black duration-300 w-fit px-4 py-1 rounded-md text-sm font-medium">
          <MessageSquareQuote className="w-4 h-4" />
          Replies ({replies})
        </p>

        {/* Operations */}
        <div className="flex items-center gap-4 ">
          <AnnouncmentOperations
            annId={id}
            content={content}
            title={title}
            type="edit"
            token={token ?? ""}
            className={className}
          />
          <p className="flex items-center gap-1 border border-red-500 text-red-500 w-fit px-4 py-1 rounded-md text-sm hover:bg-red-500 font-medium hover:text-white duration-300">
            <Trash2 className="w-4 h-4" /> Delete
          </p>
        </div>
      </div>
    </div>
  );
}
