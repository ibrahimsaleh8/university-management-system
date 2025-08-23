"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronsRight } from "lucide-react";
import { GetDepartmentsQuery } from "@/lib/GetDepartmentsQuery";
import TabelLoadingSkeleton from "@/app/dashboard/_components/TabelLoadingSkeleton";

export default function TabelShowDepartments() {
  const { departments, error, isError, isLoading } = GetDepartmentsQuery();

  if (isError && error) throw new Error(error.message);

  return isLoading && !departments ? (
    <TabelLoadingSkeleton coloumnNumber={7} rowNumber={3} />
  ) : (
    departments && (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Teachers</TableHead>
            <TableHead>Students</TableHead>
            <TableHead>Courses</TableHead>
            <TableHead>Info</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {departments.length > 0 ? (
            departments.map((dep, indx) => (
              <TableRow key={dep.id}>
                <TableCell>{indx + 1}</TableCell>
                <TableCell>{dep.name}</TableCell>
                <TableCell className="uppercase">{dep.code}</TableCell>
                <TableCell>{dep._count.teachers}</TableCell>
                <TableCell>{dep._count.students}</TableCell>
                <TableCell>{dep._count.courses}</TableCell>
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
                No Departments Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
  );
}
