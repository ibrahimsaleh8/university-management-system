import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
  const res = await axios.get(`${MainDomain}/api/get/course-offering`);
  return res.data;
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
