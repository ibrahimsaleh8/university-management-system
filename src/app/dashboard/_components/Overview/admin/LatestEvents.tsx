import LatestEventCard from "./LatestEventCard";
import { GetLatestEvents } from "../../ServerActions/GetLatestEvents";

export type LatestEventDataType = {
  id: string;
  title: string;
  description: string;
  time: Date;
  location: string;
};

export default async function LatestEvents() {
  const events: LatestEventDataType[] = await GetLatestEvents();

  return (
    <div className="w-full pb-5 bg-Second-black rounded-2xl flex flex-col gap-3 p-4 h-full">
      <p className="font-bold">Latest Events</p>
      <div className="flex flex-col gap-3">
        {events.length > 0 ? (
          events.map((event) => (
            <LatestEventCard eventData={event} key={event.id} />
          ))
        ) : (
          <p className="w-full text-low-white capitalize text-base font-medium text-center p-4">
            No events found
          </p>
        )}
      </div>
    </div>
  );
}
