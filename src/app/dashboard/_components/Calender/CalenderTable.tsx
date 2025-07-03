"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/animate-ui/radix/hover-card";
import { days, workingHours } from "@/variables/TimesVars";
import DeleteAlert from "../DeleteAlert";

export type EventDataType = {
  id: string;
  day: string;
  time: string;
  title: string;
  teacher: string;
  academicYear?: string;
  hall?: string;
};

type Props = {
  events: EventDataType[];
  canDelete: boolean;
  deleteFn?: (id: string) => void;
};

export default function CalendarTable({ events, canDelete, deleteFn }: Props) {
  return (
    <div className="w-full border border-soft-border rounded-md overflow-hidden">
      {/* Days header row */}
      <div className="grid grid-cols-[4rem_repeat(6,minmax(0,1fr))] border-b border-soft-border bg-Second-black ">
        <div className="border-r border-soft-border flex items-center justify-center text-xs font-semibold py-2">
          Time
        </div>
        {days.map((day, i) => (
          <div
            key={i}
            className="border-r last:border-r-0 border-soft-border text-center capitalize text-sm py-2 font-semibold">
            {day}
          </div>
        ))}
      </div>

      {/* Time slots */}
      {workingHours.map((hour, hourIndex) => (
        <div
          key={hourIndex}
          className="grid grid-cols-[4rem_repeat(6,minmax(0,1fr))] border-b last:border-b-0 border-soft-border">
          {/* Hour label */}
          <div className="border-r border-soft-border flex items-center justify-center text-xs py-4">
            {hour}
          </div>

          {/* Cells for each day */}
          {days.map((day, dayIndex) => {
            const cellEvent = events.find(
              (e) => e.day === day && e.time === hour
            );
            return (
              <div
                key={dayIndex}
                className="border-r last:border-r-0 border-soft-border h-16 relative hover:bg-main-text transition-colors duration-200 cursor-pointer">
                {cellEvent && (
                  <HoverCard openDelay={0.2} closeDelay={0}>
                    <HoverCardTrigger className="absolute inset-1 bg-main-text text-sm text-black  p-1 rounded overflow-hidden">
                      {cellEvent.title}
                    </HoverCardTrigger>
                    <HoverCardContent className="w-52 p-3 bg-Second-black text-white border-soft-border">
                      <div className="flex flex-col gap-1 text-[0.775rem]">
                        <p>
                          <span className="font-bold">Teacher</span>:{" "}
                          {cellEvent.teacher}
                        </p>
                        <p>
                          <span className="font-bold">Course</span>:{" "}
                          {cellEvent.title}
                        </p>
                        <p>
                          <span className="font-bold">Day</span>:{" "}
                          {cellEvent.day}
                        </p>
                        <p>
                          <span className="font-bold">Time</span>:{" "}
                          {cellEvent.time}
                        </p>

                        {cellEvent.academicYear && (
                          <p>
                            <span className="font-bold">Grade</span>:{" "}
                            {cellEvent.academicYear}
                          </p>
                        )}
                        {cellEvent.hall && (
                          <p>
                            <span className="font-bold">Hall</span>:{" "}
                            {cellEvent.hall}
                          </p>
                        )}

                        {/* Delete Button */}
                        {canDelete && deleteFn && (
                          <div className="flex justify-end">
                            <DeleteAlert
                              deleteFn={() => deleteFn(cellEvent.id)}
                              title="Schedual Time"
                            />
                          </div>
                        )}
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
