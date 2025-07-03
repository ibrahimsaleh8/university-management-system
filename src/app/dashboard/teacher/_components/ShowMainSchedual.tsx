"use client";

import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CalendarTable, {
  EventDataType,
} from "../../_components/Calender/CalenderTable";
import { Skeleton } from "@/components/ui/skeleton";
async function getTeacherSchedualTimes(id: number): Promise<EventDataType[]> {
  const res = await axios.get(`${MainDomain}/api/get/teacher-schedual/${id}`);
  return res.data;
}
export default function ShowMainSchedual({ uid }: { uid: number }) {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["get_teacher_schedual_time", uid],
    queryFn: () => getTeacherSchedualTimes(uid),
  });
  if (error && isError) throw new Error(error.message);
  return (
    <div>
      <p className="font-bold py-2">Schedule</p>
      {isLoading && !data ? (
        <Skeleton className="w-full h-[35rem] rounded-md" />
      ) : (
        data && <CalendarTable events={data} canDelete={false} />
      )}
    </div>
  );
}
