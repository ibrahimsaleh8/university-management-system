import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export type semesterDataType = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  registerBegin: string;
  registerDeadline: string;
  isActive: boolean;
};

async function getAllSemesters(): Promise<semesterDataType[]> {
  try {
    const res = await axios.get(`${MainDomain}/api/get/semester`);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
}

export const GetAllSemesters = () => {
  const {
    data: semestersData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["get_all_semesters"],
    queryFn: getAllSemesters,
  });

  return {
    semestersData,
    isLoading,
    isError,
    error,
  };
};
