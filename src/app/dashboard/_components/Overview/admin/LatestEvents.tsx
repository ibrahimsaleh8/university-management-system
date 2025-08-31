import Link from "next/link";
import LatestEventCard from "./LatestEventCard";

export type LatestEventDataType = {
  id: string;
  title: string;
  description: string;
  time: Date;
  location: string;
};

export default function LatestEvents({
  events,
}: {
  events: LatestEventDataType[];
}) {
  return (
    <div className="w-full pb-5 bg-Second-black rounded-2xl flex flex-col gap-3 p-4 h-full">
      <Link
        href={"/dashboard/admin/events"}
        className="font-bold hover:underline">
        Latest Events
      </Link>
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
