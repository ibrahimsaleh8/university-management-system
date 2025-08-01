"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TabelSkeleton from "../../teachers/_components/TabelSkeleton";
import { Button } from "@/components/ui/button";
import { ChevronsRight } from "lucide-react";
import { GetAllCoursesOffering } from "@/lib/GetAllCoursesOffering";

export default function TabelShowCoursesOffers() {
  const { coursesOffers, error, isError, isLoading } = GetAllCoursesOffering();

  if (isError && error) throw new Error(error.message);
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Academic Year</TableHead>
            <TableHead>Hall</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Semester</TableHead>
            <TableHead>Students</TableHead>
            <TableHead>Info</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <>
            {isLoading && !coursesOffers ? (
              <TableRow>
                <TableCell colSpan={8}>
                  <TabelSkeleton />
                </TableCell>
              </TableRow>
            ) : coursesOffers && coursesOffers.length > 0 ? (
              coursesOffers.map((course, indx) => (
                <TableRow key={course.id}>
                  <TableCell>{indx + 1}</TableCell>
                  <TableCell>{course.course.name}</TableCell>
                  <TableCell>{course.academicYear.year_label}</TableCell>
                  <TableCell>{course.hall}</TableCell>
                  <TableCell>{course.maxCapacity}</TableCell>
                  <TableCell>
                    {course.semester.name}{" "}
                    {course.semester.isActive ? "<Active>" : "Not Active"}
                  </TableCell>
                  <TableCell>{course._count.students}</TableCell>

                  <TableCell>
                    <Button className="bg-white hover:bg-white text-black">
                      <ChevronsRight />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="text-center" colSpan={8}>
                  No Courses Found
                </TableCell>
              </TableRow>
            )}
          </>
        </TableBody>
      </Table>
    </>
  );
}
