import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CourseStudentDataType } from "./ShowCourseStudents";
import StudentTableRow from "./StudentTableRow";

type Props = {
  students: CourseStudentDataType[];
  token: string;
  courseId: string;
};

export default function TableCourseStudents({
  students,
  token,
  courseId,
}: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student</TableHead>
          <TableHead>Enrolled Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Final Grade / 100</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.length > 0 ? (
          students.map((std) => (
            <StudentTableRow
              courseId={courseId}
              studentData={std}
              token={token}
              key={std.id}
            />
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={5}
              className="text-center text-low-white font-medium p-4">
              No Students Enrolled
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
