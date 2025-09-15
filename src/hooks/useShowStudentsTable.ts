import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { NumberOfStudents } from "@/variables/Pagination";
import { StudentResDataType } from "@/app/dashboard/admin/students/_components/ShowStudentsTable";
import axios, { AxiosError } from "axios";
import { MainDomain } from "@/variables/MainDomain";
import { GetAllYears } from "@/lib/GetAllYears";

async function getAllStudents(): Promise<StudentResDataType[]> {
  try {
    const res = await axios.get(`${MainDomain}/api/get/students`);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
}

export const useShowStudentsTable = () => {
  const [searched, setSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [SearchedData, setSearchedData] = useState<StudentResDataType[] | null>(
    null
  );
  const [filterGrade, setFilterGrade] = useState("all");

  useEffect(() => {
    setCurrentPage(1);
  }, [filterGrade]);

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
    queryKey: ["get_all_students"],
    queryFn: () => getAllStudents(),
  });

  if (isError) {
    throw new Error(error.message);
  }

  const students = useMemo(() => {
    if (!allStudents) return [];

    const source = searched && SearchedData ? SearchedData : allStudents;

    const filtered =
      filterGrade !== "all"
        ? source.filter((s) => s.academicYear.year_label === filterGrade)
        : source.filter((s) => s.academicYear.year_label != "Graduated");

    const startIndex = (currentPage - 1) * NumberOfStudents;
    return filtered.slice(startIndex, startIndex + NumberOfStudents);
  }, [SearchedData, allStudents, currentPage, filterGrade, searched]);

  const Pages = useMemo(() => {
    if (!allStudents) return 0;
    const source = searched && SearchedData ? SearchedData : allStudents;
    const filtered =
      filterGrade !== "all"
        ? source.filter((std) => std.academicYear.year_label === filterGrade)
        : source.filter((std) => std.academicYear.year_label != "Graduated");
    return Math.ceil(filtered.length / NumberOfStudents);
  }, [allStudents, SearchedData, searched, filterGrade]);

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
