"use client";
import { MessageSquareQuote, Pencil, Trash2 } from "lucide-react";
export type AnnouncementInfoType = {
  id: number;
  title: string;
  content: string;
  created_at: Date;
  replies: number;
};
export default function AnnouncmentCard({
  content,
  created_at,
  replies,
  title,
}: AnnouncementInfoType) {
  return (
    <div className="bg-Second-black border overflow-hidden border-soft-border w-full p-2 px-4 pb-4 rounded-sm flex flex-col gap-3">
      {/* Header */}
      <div className="w-full flex items-center gap-4">
        <p
          title="title"
          className="text-lg font-medium capitalize line-clamp-1">
          {title}
        </p>
        <p className="ml-auto text-sm text-low-white">
          {new Date(created_at).toString()}
        </p>
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
          <p className="flex items-center gap-1 border border-main-text text-main-text w-fit px-4 py-1 rounded-md text-sm hover:bg-main-text font-medium hover:text-black duration-300">
            <Pencil className="w-4 h-4" /> Edit
          </p>
          <p className="flex items-center gap-1 border border-red-500 text-red-500 w-fit px-4 py-1 rounded-md text-sm hover:bg-red-500 font-medium hover:text-white duration-300">
            <Trash2 className="w-4 h-4" /> Delete
          </p>
        </div>
      </div>
    </div>
  );
}
