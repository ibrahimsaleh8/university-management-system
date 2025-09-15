import { TeachersDataType } from "@/app/dashboard/admin/teachers/_components/TableShowTeachers";
import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

async function getAllTeachers(
  departmentId: number
): Promise<TeachersDataType[]> {
  try {
    const res = await axios.get(
      `${MainDomain}/api/get/department/${departmentId}/teacher`
    );
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
}
export const GetTeacherByDepartment = (
  departmentId: number,
  enableIt: boolean
) => {
  const {
    data: teachers,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["get_teacher_by_department", departmentId],
    queryFn: () => getAllTeachers(departmentId),
    enabled: enableIt,
  });

  return {
    teachers,
    isLoading,
    isError,
    error,
  };
};
