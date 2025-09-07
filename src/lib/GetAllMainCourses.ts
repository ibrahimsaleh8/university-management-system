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
  const res = await axios.get(`${MainDomain}/api/get/course`);
  return res.data;
}
export const GetAllMainCourses = () => {
  const {
    data: courses,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["get_all_courses"],
    queryFn: getAllCourses,
  });
  return {
    courses,
    isLoading,
    isError,
    error,
  };
};
