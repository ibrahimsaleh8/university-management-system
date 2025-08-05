"use client";
import { MotionEffect } from "@/components/animate-ui/effects/motion-effect";
import { timeConverter } from "@/lib/TimeConverter";
import { ReplyDataType } from "../teacher/classes/_components/ShowAnnouncementReplies";
import { useAppSelector } from "@/redux/hooks";
import { ReactNode } from "react";

export default function AnnouncmentReplyCard(
  reply: ReplyDataType & {
    deleteReplyBtn?: ReactNode;
  }
) {
  const time = timeConverter(reply.created_at);
  const deleteBtn = reply.deleteReplyBtn;
  const { id } = useAppSelector((state) => state.user.user);
  return (
    <MotionEffect
      fade
      blur="10px"
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      inView>
      <div className="bg-Second-black w-full rounded-md p-2 flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-start gap-2">
            <img
              className="w-10 h-10 rounded-full object-cover object-center"
              src={reply.student.image}
              alt="Student Image"
            />
            <div className="flex flex-col gap-1 text-left text-sm">
              <p>{reply.student.name}</p>
              <p className="text-xs text-low-white">{time}</p>
            </div>
          </div>
          {id == reply.student.stdId && deleteBtn && <>{deleteBtn}</>}
        </div>

        {/* Body */}
        <div className="pl-3 pb-1 text-left w-full">
          <p className="text-sm">{reply.content}</p>
        </div>
      </div>
    </MotionEffect>
  );
}
