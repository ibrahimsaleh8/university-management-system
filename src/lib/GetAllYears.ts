import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type academicYearsDataType = {
  id: number;
  year_label: string;
  level_number: number;
  _count: {
    students: number;
  };
};

async function getAllYears(): Promise<academicYearsDataType[]> {
  const res = await axios.get(`${MainDomain}/api/get/academic-year`);
  return res.data;
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
