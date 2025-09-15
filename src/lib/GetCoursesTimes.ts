import { EventDataType } from "@/app/dashboard/_components/Calender/CalenderTable";
import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

async function getSchedualsTime(): Promise<EventDataType[]> {
  try {
    const res = await axios.get(`${MainDomain}/api/get/course-time`);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
}

export const GetCoursesTimes = () => {
  const {
    data: times,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["get_schedual_times"],
    queryFn: () => getSchedualsTime(),
  });
  return { times, isLoading, isError, error };
};
