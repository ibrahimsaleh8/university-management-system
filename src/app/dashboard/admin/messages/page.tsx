import React from "react";
import PersonMessageCard from "../../_components/messages/PersonMessageCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import ChatBody from "../../_components/messages/ChatBody";
import CreateNewChat from "../../_components/messages/CreateNewChat";

export default function MessagesPage() {
  return (
    <div className="flex gap-3 h-[80vh]">
      {/* Left */}
      <div className="w-72 h-full overflow-y-auto p-1 bg-low-black border border-soft-border rounded-md flex flex-col gap-3">
        {/* Header */}
        <div className="flex flex-col gap-2 p-1">
          <div className="text-lg font-bold w-full border-b-2 border-soft-border pb-2 flex items-center justify-between">
            <p>Contacts</p>
            <CreateNewChat />
          </div>
          <div className="relative w-full">
            <Search className="absolute z-50 left-[12px] top-1/2 -translate-y-1/2 text-low-white w-4 h-4" />
            <Input
              type="search"
              placeholder="Search"
              className="bg-Second-black w-full rounded-md pl-10"
            />
          </div>
        </div>

        {/* Person Card */}
        {Array.from({ length: 10 }).map((_e, i) => (
          <PersonMessageCard key={i} />
        ))}
      </div>
      {/* Right */}
      <ChatBody />
    </div>
  );
}
