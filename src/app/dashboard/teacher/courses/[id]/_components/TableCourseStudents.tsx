import UserCardWithNameAndEmail from "@/app/dashboard/_components/UserCardWithNameAndEmail";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GetDateFromTime } from "@/lib/GetDateFromTime";
export default function TableCourseStudents() {
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
        <TableRow>
          <TableCell>
            <UserCardWithNameAndEmail
              email="ebrihm576@gmail.com"
              image="https://res.cloudinary.com/dnriyuqpv/image/upload/v1756626229/students/fdqmwgjbeehdapoeqrhq.png"
              name="Noyan Knighter"
            />
          </TableCell>
          <TableCell>{GetDateFromTime("2008-05-22T00:00:00.000Z")}</TableCell>
          <TableCell>
            <Badge appearance="light" variant={"success"}>
              Done
            </Badge>
          </TableCell>
          <TableCell>
            <Input
              type="number"
              placeholder="Degree"
              className="w-28"
              max={100}
              min={0}
            />
          </TableCell>
          <TableCell>
            <Button variant={"mainWithShadow"}>Save</Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
