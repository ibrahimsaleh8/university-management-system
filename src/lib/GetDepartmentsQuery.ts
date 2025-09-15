import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export type DepartmentResponseType = {
  id: number;
  name: string;
  code: string;
  _count: {
    courses: number;
    students: number;
    teachers: number;
  };
};

async function getAllDepartments(): Promise<DepartmentResponseType[]> {
  try {
    const res = await axios.get(`${MainDomain}/api/get/department`);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
}
export const GetDepartmentsQuery = () => {
  const {
    data: departments,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["get_all_departments"],
    queryFn: getAllDepartments,
  });

  return {
    departments,
    isLoading,
    isError,
    error,
  };
};
