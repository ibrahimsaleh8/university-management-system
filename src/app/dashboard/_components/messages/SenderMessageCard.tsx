"use client";
import { Button } from "@/components/ui/button";
import { timeConverter } from "@/lib/TimeConverter";
import { Check, CheckCheck } from "lucide-react";
import { useState } from "react";
type Props = {
  isRead: boolean;
  messageType: "sender" | "current";
};
export default function SenderMessageCard({ isRead, messageType }: Props) {
  const [isReadMess, setIsReadMess] = useState(isRead);
  const messageTypeClass =
    messageType == "sender" ? "bg-Second-black" : "bg-[#454545]";
  return (
    <div
      className={`flex items-start gap-3 p-3 rounded-md ${messageTypeClass}`}>
      <img
        className="w-10 h-10 object-center object-cover rounded-full"
        src="https://i.ibb.co/kV27Z5B3/user-profile.jpg"
        alt="person-image"
      />
      <div className="flex flex-col gap-2">
        <p className="text-white text-xs">
          {timeConverter("2025-06-23T08:49:06.535Z")}
        </p>
        <p className="text-white">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum
          voluptate inventore quod voluptas eligendi qui saepe nam. Sed
          laboriosam ex ipsum ipsam provident, est atque ab laudantium, quam
          dolores commodi?
        </p>
        <div className="flex items-center justify-end">
          {messageType == "sender" ? (
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
