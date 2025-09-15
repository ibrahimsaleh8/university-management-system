"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useMemo, useState } from "react";
import TableCourseStudents from "./TableCourseStudents";
import axios, { AxiosError } from "axios";
import { MainDomain } from "@/variables/MainDomain";
import { EnrollmentStatus } from "@/lib/globalTypes";
import { useQuery } from "@tanstack/react-query";
import ErrorMessageCard from "@/app/dashboard/_components/ErrorMessageCard";
import TabelLoadingSkeleton from "@/app/dashboard/_components/TabelLoadingSkeleton";
type Props = {
  courseId: string;
  token: string;
};
export type CourseStudentDataType = {
  id: string;
  finalGrade: number | null;
  status: EnrollmentStatus;
  enrollmentDate: Date;
  student: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    image: string;
  };
};

async function getCourseStudents(
  id: string,
  token: string
): Promise<CourseStudentDataType[]> {
  try {
    const res = await axios.get(
      `${MainDomain}/api/get/teacher-courses/${id}/students`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
}

export default function ShowCourseStudents({ courseId, token }: Props) {
  const [searchTxt, setSearchTxt] = useState("");
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["course_students", courseId],
    queryFn: () => getCourseStudents(courseId, token),
  });
  const students = useMemo(() => {
    if (data) {
      const search = searchTxt.toLowerCase().trim();
      return search.length > 0
        ? data.filter(
            (std) =>
              std.student.first_name.toLowerCase().includes(search) ||
              std.student.last_name.toLowerCase().includes(search)
          )
        : data;
    }
  }, [data, searchTxt]);

  if (error && isError) {
    return (
      <ErrorMessageCard
        errorDescription={error.message ?? "Error in fetch course students"}
      />
    );
  }
  return (
    <div className="w-full p-4 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center gap-4 justify-between flex-wrap">
        <p className="font-bold text-xl capitalize">
          student roster and grading
        </p>

        <div className="bg-Second-Card-bg flex items-center gap-1 w-fit rounded-md pl-3">
          <Search className="w-4 h-4 text-low-white" />
          <Input
            onChange={(e) => setSearchTxt(e.target.value)}
            type="search"
            placeholder="Search by name"
            className="bg-Second-Card-bg focus-visible:border-transparent"
          />
        </div>
      </div>
      {isLoading && !students ? (
        <TabelLoadingSkeleton coloumnNumber={5} rowNumber={3} />
      ) : (
        students && (
          <TableCourseStudents
            courseId={courseId}
            students={students}
            token={token}
          />
        )
      )}
    </div>
  );
}
