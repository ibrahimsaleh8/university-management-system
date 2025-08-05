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
import TabelSkeleton from "../../teachers/_components/TabelSkeleton";
import { GetDepartmentsQuery } from "@/lib/GetDepartmentsQuery";

export default function TabelShowDepartments() {
  const { departments, error, isError, isLoading } = GetDepartmentsQuery();

  if (isError && error) throw new Error(error.message);

  return (
    <>
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
          {isLoading && !departments ? (
            <TableRow>
              <TableCell colSpan={7}>
                <TabelSkeleton count={4} />
              </TableCell>
            </TableRow>
          ) : departments && departments.length > 0 ? (
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
              <TableCell colSpan={7}>No Departments Found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
