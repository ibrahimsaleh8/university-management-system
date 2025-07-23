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

export default function ChatBody() {
  const refreshBtn = useRef<SVGSVGElement>(null);
  return (
    <div className="w-full h-full bg-low-black border border-soft-border rounded-md overflow-x-hidden flex flex-col">
      {/* Header */}
      <div className="w-full p-3 bg-Second-black flex justify-between gap-3">
        <div className="flex items-start gap-2">
          <img
            className="w-10 h-10 object-center object-cover rounded-full"
            src="https://i.ibb.co/kV27Z5B3/user-profile.jpg"
            alt="person-image"
          />
          <div>
            <p>Mr Noyan</p>
            <p className="text-xs text-low-white">Teacher</p>
          </div>
        </div>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger
              onClick={() => {
                refreshBtn.current?.classList.add("refresh-rotation");
                setTimeout(() => {
                  refreshBtn.current?.classList.remove("refresh-rotation");
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
        <MotionEffect
          fade
          blur="10px"
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          inView>
          <SenderMessageCard messageType="current" isRead={true} />
        </MotionEffect>
        <MotionEffect
          fade
          blur="10px"
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          inView>
          <SenderMessageCard messageType="sender" isRead={false} />
        </MotionEffect>
        <MotionEffect
          fade
          blur="10px"
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          inView>
          <SenderMessageCard messageType="sender" isRead={false} />
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
    </div>
  );
}
