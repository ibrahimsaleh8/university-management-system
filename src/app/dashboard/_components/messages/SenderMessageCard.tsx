"use client";
import { Button } from "@/components/ui/button";
import { timeConverter } from "@/lib/TimeConverter";
import { Check, CheckCheck } from "lucide-react";
import { useState } from "react";
import { ChatMessageDataType } from "./ChatBody";
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import GlobalToast from "@/components/Global/GlobalToast";
import { ErrorResponseType } from "@/lib/globalTypes";
async function markMessageAsRead(msgId: string, token: string) {
  await axios.patch(
    `${MainDomain}/api/messages/message-mark-read`,
    {
      id: msgId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
export default function SenderMessageCard({
  isRead,
  sender,
  createdAt,
  message,
  activeChatId,
  id,
  token,
}: ChatMessageDataType & { token: string; activeChatId: string }) {
  const [isReadMess, setIsReadMess] = useState(isRead);
  const messageTypeClass = sender == "you" ? "bg-Second-black" : "bg-[#454545]";
  const reactQuery = useQueryClient();
  // Query APi
  const { mutate, isPending } = useMutation({
    mutationFn: (params: { msgId: string; token: string }) =>
      markMessageAsRead(params.msgId, params.token),
    onSuccess: () => {
      reactQuery.refetchQueries({
        queryKey: ["chat_msgs", activeChatId],
      });
      reactQuery.refetchQueries({
        queryKey: ["get_all_chats"],
      });
    },

    onError: (err: ErrorResponseType) => {
      GlobalToast({
        icon: "error",
        title: err.response.data.message,
      });
    },
  });

  // Handle Fn
  const HandleMarkAsRead = () => {
    setIsReadMess(true);
    mutate({
      msgId: id,
      token,
    });
  };
  return (
    <div
      className={`flex items-start gap-3 p-3 w-fit ${
        sender == "you" ? "ml-auto" : ""
      } rounded-md ${messageTypeClass}`}>
      <div className="flex flex-col gap-2">
        <p className="text-white text-xs">{timeConverter(createdAt)}</p>
        <p className="text-white">{message} </p>
        <div className="flex items-center justify-end">
          {sender === "another" ? (
            isReadMess ? (
              <CheckCheck className="w-5 h-5 text-main-text" />
            ) : (
              <Button
                disabled={isPending}
                onClick={HandleMarkAsRead}
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
