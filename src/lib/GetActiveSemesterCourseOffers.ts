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
async function getAllCourses(): Promise<
  {
    id: string;
    name: string;
  }[]
> {
  const res = await axios.get(
    `${MainDomain}/api/get/semester/active/course-offers`
  );
  return res.data;
}
export const GetActiveSemesterCourseOffers = () => {
  const {
    data: courses,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["get_active_semester_courses_offers"],
    queryFn: getAllCourses,
  });
  return {
    courses,
    isLoading,
    isError,
    error,
  };
};
