"use client";
import { timeConverter } from "@/lib/TimeConverter";
import AnnouncmentOperations from "../teacher/classes/_components/AnnouncmentOperations";
import ShowAnnouncementReplies from "../teacher/classes/_components/ShowAnnouncementReplies";
import OperationsDropdown from "./OperationsDropdown";
import Image from "next/image";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { SlidingNumber } from "@/components/animate-ui/text/sliding-number";
import { AttachmentsFileType } from "@/lib/globalTypes";
import AnnouncmentAttachmentView from "./AnnouncmentAttachmentView";

export type AnnouncementInfoType = {
  id: string;
  title: string;
  content: string;
  created_at: Date;
  replies: number;
  token?: string;
  className?: string;
  teacher: {
    first_name: string;
    last_name: string;
    image: string;
  };
  likes: number;
  dislikes: number;
  attachments: {
    id: string;
    name: string;
    url: string;
    type: AttachmentsFileType;
  }[];
};

export default function AnnouncmentCard({
  content,
  created_at,
  replies,
  title,
  id,
  token,
  className,
  teacher,
  dislikes,
  likes,
  attachments,
}: AnnouncementInfoType) {
  const ann_created_at = timeConverter(created_at);

  return (
    <div className="bg-main-dark border border-soft-border black-box-shadow overflow-hidden w-full p-3 px-4 pb-4 rounded-md flex flex-col gap-3">
      {/* top */}

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Image
            src={teacher.image}
            alt="teacher image"
            width={1000}
            height={1000}
            className="w-12 h-12 object-cover object-center rounded-full"
          />
          <div className="flex flex-col gap-0">
            <p className="text-sm capitalize">
              Dr. {teacher.first_name} {teacher.last_name}
            </p>
            <p className="ml-auto text-xs text-low-white">{ann_created_at}</p>
          </div>
        </div>
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
                attachments={attachments}
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

      {/* Content */}
      <div className="pb-1 flex flex-col gap-1">
        <p
          title="title"
          className="text-lg font-medium flex items-center gap-2 capitalize line-clamp-1">
          {title}
        </p>
        <p className="text-sm pl-1 opacity-90">{content}</p>
      </div>

      {/* Attachments */}
      {attachments.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            {attachments
              .filter((att) => att.type == "PDF")
              .map((att) => (
                <AnnouncmentAttachmentView
                  key={att.id}
                  type={att.type}
                  url={att.url}
                  name={att.name}
                />
              ))}
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            {attachments
              .filter((att) => att.type == "IMAGE")
              .map((att) => (
                <AnnouncmentAttachmentView
                  key={att.id}
                  type={att.type}
                  url={att.url}
                  name={att.name}
                />
              ))}
          </div>
        </div>
      )}

      {/* Bottom */}
      <div className="mt-auto flex sm:items-center justify-between gap-4 ">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <SlidingNumber
              transition={{ duration: 1000 }}
              className="text-base"
              number={likes}
            />
            <AiFillLike className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-2">
            <SlidingNumber
              transition={{ duration: 1000 }}
              className="text-base"
              number={dislikes}
            />
            <AiFillDislike className="w-5 h-5 mt-1" />
          </div>
        </div>
        <ShowAnnouncementReplies annId={id} replies={replies} />
      </div>
    </div>
  );
}
