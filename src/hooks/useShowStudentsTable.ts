import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { NumberOfStudents } from "@/variables/Pagination";
import { StudentResDataType } from "@/app/dashboard/admin/students/_components/ShowStudentsTable";
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";
async function getAllStudents(
  pageNumber: number
): Promise<StudentResDataType[]> {
  const res = await axios.get(
    `${MainDomain}/api/get/students?page=${pageNumber}`
  );
  return res.data;
}
async function getStudentsNumber(): Promise<{ numbers: number }> {
  const res = await axios.get(`${MainDomain}/api/get/students-number`);
  return res.data;
}

export const useShowStudentsTable = () => {
  const [searched, setSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [SearchedData, setSearchedData] = useState<StudentResDataType[] | null>(
    null
  );
  const {
    data: allStudents,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["get_all_student", currentPage],
    queryFn: () => getAllStudents(currentPage),
  });

  if (isError) {
    throw new Error(error.message);
  }

  const { data: studentNumber } = useQuery({
    queryKey: ["students_number"],
    queryFn: () => getStudentsNumber(),
  });

  const students = useMemo(() => {
    return searched && SearchedData ? SearchedData : allStudents;
  }, [SearchedData, allStudents, searched]);

  const Pages = useMemo(() => {
    return studentNumber
      ? Math.ceil(studentNumber.numbers / NumberOfStudents)
      : 0;
  }, [studentNumber]);

  return {
    Pages,
    students,
    isLoading,
    setSearched,
    setSearchedData,
    setCurrentPage,
    searched,
    currentPage,
  };
};
