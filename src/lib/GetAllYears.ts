import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export type academicYearsDataType = {
  id: number;
  year_label: string;
  level_number: number;
  _count: {
    students: number;
  };
};

async function getAllYears(): Promise<academicYearsDataType[]> {
  try {
    const res = await axios.get(`${MainDomain}/api/get/academic-year`);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
}
export const GetAllYears = () => {
  const {
    data: years,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["get_all_years"],
    queryFn: getAllYears,
  });
  return { years, isLoading, isError, error };
};
