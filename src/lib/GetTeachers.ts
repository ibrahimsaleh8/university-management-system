import { TeachersDataType } from "@/app/dashboard/admin/teachers/_components/TableShowTeachers";
import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

async function getAllTeachers(): Promise<TeachersDataType[]> {
  try {
    const res = await axios.get(`${MainDomain}/api/get/teachers`);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
}
export const GetTeachers = () => {
  const {
    data: teachers,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["get_all_teachers"],
    queryFn: () => getAllTeachers(),
  });

  return {
    teachers,
    isLoading,
    isError,
    error,
  };
};
