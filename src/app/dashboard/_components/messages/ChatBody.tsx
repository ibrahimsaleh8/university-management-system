"use client";
import SenderMessageCard from "./SenderMessageCard";
import { RotateCw, Send } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/animate-ui/radix/tooltip";
import { useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MotionEffect } from "@/components/animate-ui/effects/motion-effect";
import { useSearchParams } from "next/navigation";
type Props = {
  token: string;
};
import MsgImage from "@images/Messaging-cuate.png";
import Image from "next/image";
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";
import { UserMessageData } from "./ShowChats";
import { useQuery } from "@tanstack/react-query";
export type ChatMessageDataType = {
  id: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  sender: "you" | "another";
};
export type ChatDetailsResponse = {
  id: string;
  messages: ChatMessageDataType[];
  anotheruser: UserMessageData;
};

async function getChatMessages(
  id: string,
  token: string
): Promise<ChatDetailsResponse> {
  const res = await axios.get(`${MainDomain}/api/messages/get-chats/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export default function ChatBody({ token }: Props) {
  const refreshBtn = useRef<SVGSVGElement>(null);
  const params = useSearchParams();
  const activeChatId = params.get("chatId");

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["chat_msgs", activeChatId],
    queryFn: () => getChatMessages(activeChatId ?? "", token),
    enabled: activeChatId != null,
  });
  if (isError && error) throw new Error(error.message);
  console.log("CHATD DATA");

  return (
    <div className="w-full h-full bg-low-black border border-soft-border rounded-md overflow-x-hidden flex flex-col">
      {activeChatId ? (
        isLoading ? (
          <>Loading...</>
        ) : (
          data && (
            <>
              {/* Header */}
              <div className="w-full p-3 bg-Second-black flex justify-between gap-3">
                <div className="flex items-start gap-2">
                  <img
                    className="w-10 h-10 object-center object-cover rounded-full"
                    src={
                      data.anotheruser.image ??
                      "https://i.ibb.co/kV27Z5B3/user-profile.jpg"
                    }
                    alt={`${data.anotheruser.first_name}-image`}
                  />
                  <div>
                    <p>
                      {data.anotheruser.first_name} {data.anotheruser.last_name}
                    </p>
                    <p className="text-xs text-low-white">
                      {data.anotheruser.email}
                    </p>
                  </div>
                </div>
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger
                      onClick={() => {
                        refreshBtn.current?.classList.add("refresh-rotation");
                        setTimeout(() => {
                          refreshBtn.current?.classList.remove(
                            "refresh-rotation"
                          );
                        }, 600);
                      }}
                      className="bg-Second-black pr-1 cursor-pointer flex items-center justify-center rounded-sm  text-main-text">
                      <RotateCw ref={refreshBtn} className="w-5 h-5" />
                    </TooltipTrigger>
                    <TooltipContent>Refresh Messages</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              {/* Body */}
              <div className="w-full h-[85%] overflow-y-auto p-3 flex flex-col gap-2">
                {data.messages.map((msg) => (
                  <MotionEffect
                    key={msg.id}
                    fade
                    blur="10px"
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                    }}
                    inView>
                    <SenderMessageCard {...msg} />
                  </MotionEffect>
                ))}
                <MotionEffect
                  fade
                  blur="10px"
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                  inView>
                  <SenderMessageCard
                    createdAt="2025-07-24T15:41:31.671Z"
                    id="asdasdfq3e1e"
                    isRead={true}
                    message="Nice Work"
                    sender="another"
                  />
                </MotionEffect>
              </div>

              {/* Send Message */}
              <div className="w-full bg-Second-black mt-auto flex items-center gap-2 p-2">
                <Textarea
                  className="bg-black resize-none h-full"
                  placeholder="Message"
                />
                <Button variant={"mainWithShadow"} className="rounded-full">
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </>
          )
        )
      ) : (
        <div className="flex items-center justify-center w-full h-full flex-col gap-1">
          <Image
            src={MsgImage}
            alt="Messageing Image"
            className="w-96 opacity-40"
          />
          <p className="text-sm text-low-white text-center capitalize">
            choose your chat to show chat messages
          </p>
        </div>
      )}
    </div>
  );
}
