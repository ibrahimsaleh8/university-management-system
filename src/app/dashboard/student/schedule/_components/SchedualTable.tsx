import { EventDataType } from "@/app/dashboard/_components/Calender/CalenderTable";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const days = [
  "saturday",
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
];

export default function SchedualTable({ data }: { data: EventDataType[] }) {
  const tableData = days.map((d) => ({
    day: d,
    times: data.find((da) => da.day == d),
  }));
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Day</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Course</TableHead>
          <TableHead>Hall</TableHead>
          <TableHead>Academic Year</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((t) => (
          <TableRow key={t.day}>
            <TableCell className="p-4 capitalize">{t.day}</TableCell>
            <TableCell className="p-4">
              {t.times ? t.times.time : "___"}
            </TableCell>
            <TableCell className="p-4">
              {t.times ? t.times.title : "___"}
            </TableCell>
            <TableCell className="p-4">
              {t.times ? t.times.hall : "___"}
            </TableCell>
            <TableCell className="p-4">
              {t.times ? t.times.academicYear : "___"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
