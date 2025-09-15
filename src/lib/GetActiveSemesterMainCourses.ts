import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export type coursesDataType = {
  id: number;
  code: string;
  name: string;
  credit_hours: number;
  department: {
    id: number;
    name: string;
  };
  isElective: boolean;
};
async function getAllCourses(): Promise<coursesDataType[]> {
  try {
    const res = await axios.get(
      `${MainDomain}/api/get/semester/active/main-courses`
    );
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
}
export const GetActiveSemesterMainCourses = () => {
  const {
    data: courses,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["get_active_semester_main_courses"],
    queryFn: getAllCourses,
  });
  return {
    courses,
    isLoading,
    isError,
    error,
  };
};
