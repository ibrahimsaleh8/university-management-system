import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CourseOfferingResponse } from "./RegisterAvailabelCourses";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
type Props = {
  courseData: CourseOfferingResponse[];
  token: string;
};
export default function StudentAvailabelCoursesTable({ courseData }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Course</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Hours</TableHead>
          <TableHead>Pre Required Courses</TableHead>
          <TableHead>Capacity</TableHead>
          <TableHead>Operations</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courseData.map((course, index) => (
          <TableRow key={course.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              {course.course_name} - [{course.course_code}]{" "}
              {course.course_isElective && (
                <span className="text-sm text-amber-500">(Elective)</span>
              )}
            </TableCell>

            <TableCell>{course.course_department}</TableCell>
            <TableCell>{course.course_hours}</TableCell>
            <TableCell>
              {course.requiredCourses.length > 0
                ? course.requiredCourses[0].name
                : "No Prerequisites"}
            </TableCell>
            <TableCell>
              {course.registerd.toFixed(0)}/ {course.maxCapacity}
            </TableCell>
            <TableCell className="py-3">
              <Button className="bg-white text-black h-8 hover:bg-white border border-white hover:text-black duration-300">
                <Plus className="w-5 h-5" /> Register
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
