import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type semesterDataType = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  registerBegin: string;
  registerDeadline: string;
  isActive: boolean;
};

async function getActiveSemesterApi(): Promise<semesterDataType> {
  const res = await axios.get(`${MainDomain}/api/get/semester/active`);
  return res.data;
}

export const GetActiveSemester = () => {
  const {
    data: semesterData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["get_active_semester"],
    queryFn: getActiveSemesterApi,
  });

  return {
    semesterData,
    isLoading,
    isError,
    error,
  };
};
