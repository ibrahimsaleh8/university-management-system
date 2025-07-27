import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { NumberOfStudents } from "@/variables/Pagination";
import { StudentResDataType } from "@/app/dashboard/admin/students/_components/ShowStudentsTable";
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";
import { GetAllYears } from "@/lib/GetAllYears";

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
  const [filterGrade, setFilterGrade] = useState("all");

  const {
    error: errYears,
    isError: isErrorYear,
    isLoading: loadingYears,
    years,
  } = GetAllYears();

  if (errYears && isErrorYear) throw new Error(errYears.message);
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
    if (!allStudents) return undefined;

    if (searched && SearchedData) {
      return filterGrade !== "all"
        ? SearchedData.filter((s) => s.academicYear.year_label === filterGrade)
        : SearchedData;
    }

    return filterGrade !== "all"
      ? allStudents.filter((std) => std.academicYear.year_label === filterGrade)
      : allStudents.filter((std) => std.academicYear.year_label != "Graduated");
  }, [SearchedData, allStudents, filterGrade, searched]);

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
    setFilterGrade,
    loadingYears,
    years,
  };
};
