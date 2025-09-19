import React from "react";
import ChatBody from "../../_components/messages/ChatBody";
import { cookies } from "next/headers";
import ShowChats from "../../_components/messages/ShowChats";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Messages",
};

export default async function MessagesPage() {
  const token = (await (await cookies()).get("token")?.value) as string;
  return (
    <div
      className="flex flex-col sm:flex-row gap-3 h-full"
      style={{
        height: "calc(100vh - 110px)",
      }}>
      {/* Left */}
      <ShowChats token={token} />
      {/* Right */}
      <ChatBody token={token} />
    </div>
  );
}
