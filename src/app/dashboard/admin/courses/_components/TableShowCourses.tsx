"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GetAllMainCourses } from "@/lib/GetAllMainCourses";
import TabelLoadingSkeleton from "@/app/dashboard/_components/TabelLoadingSkeleton";
import ShowDetailsModel from "@/app/dashboard/_components/ShowDetailsModel";
import EditMainCourse from "./EditMainCourse";
import { Badge } from "@/components/ui/badge";

export default function TableShowCourses({ token }: { token: string }) {
  const { courses, error, isError, isLoading } = GetAllMainCourses();
  if (isError && error) throw new Error(error.message);

  return isLoading && !courses ? (
    <TabelLoadingSkeleton coloumnNumber={7} rowNumber={3} />
  ) : (
    courses && (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Credits</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Show</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.length > 0 ? (
            courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="uppercase">{course.code}</TableCell>
                <TableCell>{course.name}</TableCell>
                <TableCell className="capitalize">
                  {course.department.name}
                </TableCell>
                <TableCell>{course.credit_hours}</TableCell>
                <TableCell>
                  {course.isElective ? (
                    <Badge variant="warning" appearance="light">
                      Elective
                    </Badge>
                  ) : (
                    <Badge variant="success" appearance="light">
                      Core
                    </Badge>
                  )}
                </TableCell>

                <TableCell>
                  <ShowDetailsModel
                    title="Course Details"
                    childComponent={
                      <EditMainCourse courseData={course} token={token} />
                    }
                  />
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
