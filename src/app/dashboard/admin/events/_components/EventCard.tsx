import { timeConverter } from "@/lib/TimeConverter";
import { CalendarDays } from "lucide-react";
import { EventResponseType } from "./ShowAllEvents";
import OperationsDropdown from "@/app/dashboard/_components/OperationsDropdown";
import EventOperations from "./EventOperations";

export default function EventCard({
  description,
  isFinished,
  time,
  title,
  canOperate,
  id,
  token,
}: EventResponseType & { canOperate: boolean; token: string }) {
  return (
    <div className="exam-head-dash  overflow-hidden bg-Second-black rounded-md w-full p-4  flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <p className="font-bold flex items-center gap-1 line-clamp-1">
          {isFinished ? (
            <span className="text-xs p-1 bg-green-600 text-white rounded-sm">
              Finished
            </span>
          ) : (
            <CalendarDays className="w-4 h-4 text-low-white" />
          )}

          {title}
        </p>
        <p className="text-xs text-low-white">{timeConverter(time)}</p>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-sm">{description}</p>
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
                  time,
                  title,
                }}
              />,
            ]}
          />
        )}
      </div>
    </div>
  );
}
