"use client";

import { useQuery } from "@tanstack/react-query";
import EventCard from "./EventCard";
import axios, { AxiosError } from "axios";
import { MainDomain } from "@/variables/MainDomain";
import { Skeleton } from "@/components/ui/skeleton";

export type EventResponseType = {
  id: string;
  title: string;
  description: string;
  time: Date;
  location: string;
  isFinished: boolean;
};
async function getAllEvents(): Promise<EventResponseType[]> {
  try {
    const res = await axios.get(`${MainDomain}/api/get/event`);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
}
export default function ShowAllEvents({ token }: { token: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["get_all_events"],
    queryFn: () => getAllEvents(),
  });

  return isLoading && !data ? (
    <div className="flex flex-col gap-2">
      <Skeleton className="w-full h-44 rounded-md" />
      <Skeleton className="w-full h-44 rounded-md" />
      <Skeleton className="w-full h-44 rounded-md" />
    </div>
  ) : data && data.length > 0 ? (
    <div className="flex flex-col gap-6">
      {data
        .filter((event) => !event.isFinished)
        .map((event) => (
          <EventCard
            token={token}
            canOperate={true}
            key={event.id}
            {...event}
          />
        ))}
      {data.filter((event) => event.isFinished).length > 0 && (
        <div className="flex items-center gap-4 text-sm font-medium text-low-white">
          <span className="flex bg-Second-Card-bg w-full h-[1px]"></span>
          <p>Finished</p>
          <span className="flex bg-Second-Card-bg w-full h-[1px]"></span>
        </div>
      )}

      {data
        .filter((event) => event.isFinished)
        .map((event) => (
          <EventCard
            token={token}
            canOperate={true}
            key={event.id}
            {...event}
          />
        ))}
    </div>
  ) : (
    <div className="flex items-center justify-center w-full h-32 rounded-md text-low-white bg-Second-black">
      No Events Found...
    </div>
  );
}
