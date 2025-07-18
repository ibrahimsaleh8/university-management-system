import { timeConverter } from "@/lib/TimeConverter";
import { CalendarDays } from "lucide-react";
import { EventResponseType } from "./ShowAllEvents";
import OperationsDropdown from "@/app/dashboard/_components/OperationsDropdown";
import DeleteEvent from "./DeleteEvent";

export default function EventCard({
  description,
  isFinished,
  time,
  title,
  canOperate,
}: EventResponseType & { canOperate: boolean }) {
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
      <p className="text-sm">{description} </p>
      {canOperate && (
        <div className="flex justify-end items-center">
          <OperationsDropdown components={[<DeleteEvent key={1} />]} />
        </div>
      )}
    </div>
  );
}
