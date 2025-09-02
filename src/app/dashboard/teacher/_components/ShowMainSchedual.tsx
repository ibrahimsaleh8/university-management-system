"use client";

import CalendarTable, {
  EventDataType,
} from "../../_components/Calender/CalenderTable";

export default function ShowMainSchedual({ data }: { data: EventDataType[] }) {
  return <CalendarTable events={data} canDelete={false} />;
}
