"use client";

import { days, workingHours } from "@/variables/TimesVars";

type Event = {
  day: string; // e.g., "monday"
  time: string; // e.g., "11:00 AM"
  title: string;
};

// Sample events for demonstration
const events: Event[] = [
  { day: "monday", time: "11:00 AM", title: "Team Meeting" },
  { day: "wednesday", time: "02:00 PM", title: "Doctor Appointment" },
  { day: "saturday", time: "09:00 AM", title: "Workout Session" },
];

export default function CalendarTable() {
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
                  <div className="absolute inset-1 bg-main-text text-black text-xs p-1 rounded overflow-hidden">
                    {cellEvent.title}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
