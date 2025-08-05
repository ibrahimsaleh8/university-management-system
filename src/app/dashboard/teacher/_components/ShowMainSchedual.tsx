"use client";

import CalendarTable, {
  EventDataType,
} from "../../_components/Calender/CalenderTable";

export default function ShowMainSchedual({ data }: { data: EventDataType[] }) {
  return (
    <div>
      <p className="font-bold py-2">Your Schedule</p>
      <CalendarTable events={data} canDelete={false} />
    </div>
  );
}
