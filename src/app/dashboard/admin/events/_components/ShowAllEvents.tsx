"use client";

import { useQuery } from "@tanstack/react-query";
import EventCard from "./EventCard";
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";
import { Skeleton } from "@/components/ui/skeleton";

export type EventResponseType = {
  id: string;
  title: string;
  description: string;
  time: string;
  isFinished: boolean;
};
async function getAllEvents(): Promise<EventResponseType[]> {
  const res = await axios.get(`${MainDomain}/api/get/event`);
  return res.data;
}
export default function ShowAllEvents({ token }: { token: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["get_all_events"],
    queryFn: () => getAllEvents(),
  });

  return (
    <div>
      {isLoading && !data ? (
        <div className="flex flex-col gap-2">
          <Skeleton className="w-full h-24 rounded-md" />
          <Skeleton className="w-full h-24 rounded-md" />
          <Skeleton className="w-full h-24 rounded-md" />
        </div>
      ) : (
        data && (
          <>
            {data.length > 0 ? (
              <div className="flex flex-col gap-3">
                {data.map((event) => (
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
            )}
          </>
        )
      )}
    </div>
  );
}
