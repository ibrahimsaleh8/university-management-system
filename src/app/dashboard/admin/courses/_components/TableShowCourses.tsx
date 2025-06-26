"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import TabelSkeleton from "../../teachers/_components/TabelSkeleton";
import { Button } from "@/components/ui/button";
import { ChevronsRight } from "lucide-react";
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";

type coursesDataType = {
  id: number;
  code: string;
  name: string;
  credit_hours: number;
  department: {
    name: string;
  };
  isElective: boolean;
};
async function getAllCourses(): Promise<coursesDataType[]> {
  const res = await axios.get(`${MainDomain}/api/get/course`);
  return res.data;
}
export default function TableShowCourses() {
  const {
    data: courses,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["get_all_courses"],
    queryFn: getAllCourses,
  });

  if (isError) throw new Error(error.message);
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Credit Hours</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Is Elective</TableHead>
            <TableHead>Info</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <>
            {isLoading && !courses ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <TabelSkeleton />
                </TableCell>
              </TableRow>
            ) : courses && courses.length > 0 ? (
              courses.map((course, indx) => (
                <TableRow key={course.id}>
                  <TableCell>{indx + 1}</TableCell>
                  <TableCell>{course.name}</TableCell>
                  <TableCell className="uppercase">{course.code}</TableCell>
                  <TableCell>{course.credit_hours}</TableCell>
                  <TableCell>{course.department.name}</TableCell>
                  <TableCell>{course.isElective ? "true" : "false"}</TableCell>
                  <TableCell>
                    <Button className="bg-white hover:bg-white text-black">
                      <ChevronsRight />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7}>No Courses Found</TableCell>
              </TableRow>
            )}
          </>
        </TableBody>
      </Table>
    </>
  );
}
