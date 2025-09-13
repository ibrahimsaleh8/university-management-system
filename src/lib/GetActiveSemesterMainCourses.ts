import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
  const res = await axios.get(
    `${MainDomain}/api/get/semester/active/main-courses`
  );
  return res.data;
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
