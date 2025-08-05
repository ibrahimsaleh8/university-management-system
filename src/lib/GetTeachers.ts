import { TeachersDataType } from "@/app/dashboard/admin/teachers/_components/TableShowTeachers";
import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function getAllTeachers(pageNumber: number): Promise<TeachersDataType[]> {
  const res = await axios.get(
    `${MainDomain}/api/get/teachers?page=${pageNumber}`
  );
  return res.data;
}
export const GetTeachers = (activePaginateNumber: number) => {
  const {
    data: teachers,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["get_all_teachers", activePaginateNumber],
    queryFn: () => getAllTeachers(activePaginateNumber),
  });

  return {
    teachers,
    isLoading,
    isError,
    error,
  };
};
