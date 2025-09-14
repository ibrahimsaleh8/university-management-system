import { TeachersDataType } from "@/app/dashboard/admin/teachers/_components/TableShowTeachers";
import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function getAllTeachers(): Promise<TeachersDataType[]> {
  const res = await axios.get(`${MainDomain}/api/get/teachers`);
  return res.data;
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
