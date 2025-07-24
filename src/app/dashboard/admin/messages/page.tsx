import React from "react";
import ChatBody from "../../_components/messages/ChatBody";
import { cookies } from "next/headers";
import ShowChats from "../../_components/messages/ShowChats";

export default async function MessagesPage() {
  const token = (await (await cookies()).get("token")?.value) as string;
  return (
    <div className="flex gap-3 h-[80vh]">
      {/* Left */}
      <ShowChats token={token} />
      {/* Right */}
      <ChatBody token={token} />
    </div>
  );
}
