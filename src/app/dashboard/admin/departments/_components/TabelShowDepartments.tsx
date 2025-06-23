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
import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChevronsRight } from "lucide-react";
import TabelSkeleton from "../../teachers/_components/TabelSkeleton";

type DepartmentResponseType = {
  id: number;
  name: string;
  code: string;
  _count: {
    courses: number;
    students: number;
    teachers: number;
  };
};

async function getAllDepartments(): Promise<DepartmentResponseType[]> {
  const res = await axios.get(`${MainDomain}/api/get/department`);
  return res.data;
}

export default function TabelShowDepartments() {
  const {
    data: departments,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["get_all_departments"],
    queryFn: getAllDepartments,
  });

  if (isError) throw new Error(error.message);

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
                <TabelSkeleton />
              </TableCell>
            </TableRow>
          ) : (
            departments &&
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
          )}
        </TableBody>
      </Table>
    </>
  );
}
