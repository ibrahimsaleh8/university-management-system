import { timeConverter } from "@/lib/TimeConverter";
import { CalendarDays, MapPin } from "lucide-react";
import { EventResponseType } from "./ShowAllEvents";
import OperationsDropdown from "@/app/dashboard/_components/OperationsDropdown";
import EventOperations from "./EventOperations";
import { LocalDateTimeConverter } from "@/lib/LocalDateTimeConverter";

export default function EventCard({
  description,
  time,
  title,
  canOperate,
  id,
  token,
  location,
}: EventResponseType & { canOperate: boolean; token: string }) {
  return (
    <div className="overflow-hidden bg-Second-black rounded-md w-full p-4 border border-Second-Card-bg flex flex-col gap-2">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <p className="font-bold flex items-center gap-1 line-clamp-1 capitalize text-lg">
          <CalendarDays className="w-5 h-5 text-low-white" />
          {title}
        </p>
        <p className="text-xs text-low-white">{timeConverter(time)}</p>
      </div>
      <div className="flex flex-col">
        <p className="text-sm capitalize">{description}</p>
        <div className="flex items-center gap-3 flex-wrap mt-4 justify-between">
          <div>
            <p className="flex items-center text-low-white font-medium gap-2 text-sm bg-Main-black px-3 py-1.5 rounded-2xl">
              <MapPin className="w-4 h-4 " />
              {location}
            </p>
          </div>
          {canOperate && (
            <OperationsDropdown
              components={[
                <EventOperations
                  type="Delete Event"
                  id={id}
                  token={token}
                  key={1}
                />,
                <EventOperations
                  type="Edit Event"
                  token={token}
                  key={1}
                  eventData={{
                    description,
                    id,
                    time: LocalDateTimeConverter(time),
                    title,
                    location,
                  }}
                />,
              ]}
            />
          )}
        </div>
      </div>
    </div>
  );
}
