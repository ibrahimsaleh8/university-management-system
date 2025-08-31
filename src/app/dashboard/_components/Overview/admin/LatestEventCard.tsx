import { GetDateFromTime } from "@/lib/GetDateFromTime";
import { LatestEventDataType } from "./LatestEvents";
import { CalendarDays, MapPin, Timer } from "lucide-react";

export default function LatestEventCard({
  eventData,
}: {
  eventData: LatestEventDataType;
}) {
  return (
    <div className="flex gap-1 flex-col p-2 text-xs capitalize border-b border-soft-border">
      <p className="text-sm font-medium flex items-center gap-1">
        <CalendarDays className="w-4 h-4" />
        {eventData.title}
      </p>
      <p className="text-low-white line-clamp-1">{eventData.description}</p>
      <div className="flex items-center justify-between flex-wrap mt-1 gap-2">
        <p className="flex items-center gap-1 bg-Second-Card-bg px-3 py-1 rounded-sm">
          <Timer className="w-4 h-4" />
          {GetDateFromTime(eventData.time)}
        </p>
        <p className="flex items-center gap-1 bg-Second-Card-bg px-3 py-1 rounded-sm">
          <MapPin className="w-4 h-4" />
          {eventData.location}
        </p>
      </div>
    </div>
  );
}
