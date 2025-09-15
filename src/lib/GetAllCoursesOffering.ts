import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export type CourseOfferingDataType = {
  id: string;
  academicYear: {
    year_label: string;
  };
  course: {
    name: string;
  };
  hall: string;
  maxCapacity: number;
  semester: {
    name: string;
    isActive: boolean;
  };
  _count: {
    students: number;
  };
};

async function getAllCoursesOffering(): Promise<CourseOfferingDataType[]> {
  try {
    const res = await axios.get(`${MainDomain}/api/get/course-offering`);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
}

export const GetAllCoursesOffering = () => {
  const {
    data: coursesOffers,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["get_all_courses_offering"],
    queryFn: getAllCoursesOffering,
  });
  return {
    coursesOffers,
    isLoading,
    isError,
    error,
  };
};
