import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StudentCoursesResponse } from "../page";
import { Medal, Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
type Props = {
  data: StudentCoursesResponse;
};
export default function SemesterWithCoursesCard({ data }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <p className="pl-3 font-medium capitalize">{data.semester.name}</p>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course Name</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Hours</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Grade /100</TableHead>
            <TableHead>Evaluation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.courses.length > 0 ? (
            data.courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="p-3 capitalize">{course.name}</TableCell>
                <TableCell className="p-3 uppercase">{course.code}</TableCell>
                <TableCell className="p-3">{course.hours}</TableCell>
                <TableCell className="p-3">
                  <Badge
                    variant={
                      course.status == "ACTIVE"
                        ? "success"
                        : course.status == "COMPLETED"
                        ? "primary"
                        : course.status == "WITHDRAWN"
                        ? "warning"
                        : "success"
                    }
                    className="capitalize"
                    appearance="light">
                    {course.status.toLowerCase()}
                  </Badge>
                </TableCell>
                <TableCell className="p-3">{course.grade ?? "--"}</TableCell>
                <TableCell className="p-3">
                  {course.grade ? course.letter : "--"}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="p-4">
                No courses registerd to this semesets
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center gap-4 flex-wrap mt-3">
        <div className="bg-Second-black py-2 px-4 flex items-center gap-2 rounded-md min-w-52">
          <p className="flex items-center gap-2 text-sm  font-medium">
            <Medal className="w-4 h-4" />
            Semester GPA:
          </p>
          <p className="font-black text-main-text">{data.cumulativeGpa}</p>
        </div>
        <div className="bg-Second-black py-2 px-4 flex items-center gap-2 rounded-md min-w-52">
          <p className="flex items-center gap-2 text-sm font-medium">
            <Timer className="w-4 h-4" />
            Total Hours
          </p>
          <p className="font-black text-main-text">{data.totalHours}</p>
        </div>
      </div>
    </div>
  );
}
