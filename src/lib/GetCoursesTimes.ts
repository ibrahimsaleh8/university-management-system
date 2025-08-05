import { EventDataType } from "@/app/dashboard/_components/Calender/CalenderTable";
import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function getSchedualsTime(year: number): Promise<EventDataType[]> {
  const res = await axios.get(
    `${MainDomain}/api/get/course-time?academicYear=${year}`
  );
  return res.data;
}

export const GetCoursesTimes = (year: number) => {
  const {
    data: times,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["get_schedual_times", year],
    queryFn: () => getSchedualsTime(year),
  });
  return { times, isLoading, isError, error };
};
