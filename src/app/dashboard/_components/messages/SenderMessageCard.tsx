"use client";
import { Button } from "@/components/ui/button";
import { timeConverter } from "@/lib/TimeConverter";
import { Check, CheckCheck } from "lucide-react";
import { useState } from "react";
import { ChatMessageDataType } from "./ChatBody";

export default function SenderMessageCard({
  isRead,
  sender,
  createdAt,
  message,
}: ChatMessageDataType) {
  const [isReadMess, setIsReadMess] = useState(isRead);
  const messageTypeClass = sender == "you" ? "bg-Second-black" : "bg-[#454545]";
  return (
    <div
      className={`flex items-start gap-3 p-3 w-fit ${
        sender == "you" ? "ml-auto" : ""
      } rounded-md ${messageTypeClass}`}>
      <div className="flex flex-col gap-2">
        <p className="text-white text-xs">{timeConverter(createdAt)}</p>
        <p className="text-white">{message} </p>
        <div className="flex items-center justify-end">
          {sender == "another" ? (
            isReadMess ? (
              <CheckCheck className="w-5 h-5 text-main-text" />
            ) : (
              <Button
                onClick={() => setIsReadMess(true)}
                className="text-xs w-fit text-low-white">
                Mark As Read
                <Check className="w-5 h-5" />
              </Button>
            )
          ) : isReadMess ? (
            <CheckCheck className="w-5 h-5 text-main-text" />
          ) : (
            <Check className="w-5 h-5 text-low-white" />
          )}
        </div>
      </div>
    </div>
  );
}
