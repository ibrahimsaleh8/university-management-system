"use client";

import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CreateNewChat from "../../_components/messages/CreateNewChat";
import PersonMessageCard from "../../_components/messages/PersonMessageCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo, useState } from "react";
import { useAppSelector } from "@/redux/hooks";

type MessageChatData = {
  id: string;
  message: string;
  isRead: boolean;
  sender: "you" | "another";
};

export type UserMessageData = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  image?: string;
};
export type ChatResponse = {
  id: string;
  messages: MessageChatData[];
  user: UserMessageData;
};

async function getUserChats(token: string): Promise<ChatResponse[]> {
  const res = await axios.get(`${MainDomain}/api/messages/get-chats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export default function ShowChats({ token }: { token: string }) {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["get_all_chats"],
    queryFn: () => getUserChats(token),
    refetchOnMount: true,
  });
  if (isError && error) throw new Error(error.message);
  const [searchTxt, setSearchTxt] = useState("");
  const chats = useMemo(() => {
    if (data) {
      const resChats = [...data];
      if (searchTxt.trim().length > 0) {
        return resChats.filter(
          (chat) =>
            chat.user.first_name
              .toLowerCase()
              .includes(searchTxt.toLowerCase()) ||
            chat.user.last_name.toLowerCase().includes(searchTxt.toLowerCase())
        );
      }
      return resChats;
    }
  }, [data, searchTxt]);
  const { email, role } = useAppSelector((state) => state.user.user);

  return (
    <div className="w-72 h-full overflow-y-auto p-1 bg-low-black border border-soft-border rounded-md flex flex-col gap-3">
      {/* Header */}
      <div className="flex flex-col gap-2 p-1">
        <div className="text-lg font-bold w-full border-b-2 border-soft-border pb-2 flex items-center justify-between">
          <p>Contacts</p>
          {email && role && <CreateNewChat email={email} role={role} />}
        </div>
        <div className="relative w-full">
          <Search className="absolute z-50 left-[12px] top-1/2 -translate-y-1/2 text-low-white w-4 h-4" />
          <Input
            onChange={(e) => setSearchTxt(e.target.value)}
            type="search"
            placeholder="Search"
            className="bg-Second-black w-full rounded-md pl-10"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-1">
          <Skeleton className="w-full h-14 rounded-none" />
          <Skeleton className="w-full h-14 rounded-none" />
          <Skeleton className="w-full h-14 rounded-none" />
        </div>
      ) : chats && chats.length > 0 ? (
        chats.map((chat) => (
          <PersonMessageCard
            id={chat.id}
            image={
              chat.user.image ?? "https://i.ibb.co/kV27Z5B3/user-profile.jpg"
            }
            sender={chat.messages[0].sender}
            lastMessage={chat.messages[0].message}
            isMsgRead={chat.messages[0].isRead}
            name={`${chat.user.first_name} ${chat.user.last_name}`}
            key={chat.id}
          />
        ))
      ) : (
        <div className="w-full flex items-center justify-center text-sm text-low-white">
          No chat Found
        </div>
      )}
    </div>
  );
}
