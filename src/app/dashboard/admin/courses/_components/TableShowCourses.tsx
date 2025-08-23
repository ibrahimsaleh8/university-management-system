"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronsRight } from "lucide-react";
import { GetAllMainCourses } from "@/lib/GetAllMainCourses";
import TabelLoadingSkeleton from "@/app/dashboard/_components/TabelLoadingSkeleton";

export default function TableShowCourses() {
  const { courses, error, isError, isLoading } = GetAllMainCourses();

  if (isError && error) throw new Error(error.message);

  return isLoading && !courses ? (
    <TabelLoadingSkeleton coloumnNumber={7} rowNumber={3} />
  ) : (
    courses && (
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
          {courses.length > 0 ? (
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
              <TableCell className="text-center p-4 text-low-white" colSpan={7}>
                No Courses Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
  );
}
