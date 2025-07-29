"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MainDomain } from "@/variables/MainDomain";
import axios from "axios";
type Props = {
  token: string;
};
export type StudentCourseResponse = {
  id: string;
  status: string;
  finalGrade: number;
  enrollmentDate: string;
  courseName: string;
  courseCode: string;
  courseIsElective: boolean;
  courseDepartment: {
    id: string;
    name: string;
    code: string;
  };
  semester: string;
  academicYear: string;
};

async function showStudentRegisterdCourses(
  token: string
): Promise<StudentCourseResponse[]> {
  const res = await axios.get(
    `${MainDomain}/api/get/student-registerd-courses`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}

export default function ShowStudentCourses({}: Props) {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
