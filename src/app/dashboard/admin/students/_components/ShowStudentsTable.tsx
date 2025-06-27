"use client";
import AddingModel from "@/app/dashboard/_components/forms/AddingModel";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SearchInStudents from "./SearchInStudents";
import { Button } from "@/components/ui/button";
import { ChevronsRight } from "lucide-react";
import TabelSkeleton from "../../teachers/_components/TabelSkeleton";
import TablePagination from "../../teachers/_components/TablePagination";
import { useShowStudentsTable } from "@/hooks/useShowStudentsTable";

export type StudentResDataType = {
  id: number;
  student_id: string;
  first_name: string;
  last_name: string;
  email: string;
  academicYear: {
    year_label: string;
  };
};

export default function ShowStudentsTable({ token }: { token: string }) {
  const {
    Pages,
    isLoading,
    setCurrentPage,
    setSearched,
    setSearchedData,
    students,
    searched,
    currentPage,
  } = useShowStudentsTable();
  return (
    <div className="flex flex-col gap-3">
      {/* Search & add */}
      <div className="flex sm:items-center flex-wrap gap-3 justify-between sm:flex-row flex-col">
        {/* Search */}
        <SearchInStudents
          searched={searched}
          setSearched={setSearched}
          setSearchedData={setSearchedData}
        />
        <AddingModel AddType="Student" token={token} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6}>
                <TabelSkeleton />
              </TableCell>
            </TableRow>
          ) : students && students.length > 0 ? (
            <>
              {students.map((std, indx) => (
                <TableRow key={std.id}>
                  <TableCell>{indx + 1}</TableCell>
                  <TableCell className="text-sm">{std.student_id}</TableCell>
                  <TableCell>{`${std.first_name} ${std.last_name}`}</TableCell>
                  <TableCell>{std.email}</TableCell>
                  <TableCell>{std.academicYear.year_label}</TableCell>
                  <TableCell>
                    <Button className="bg-white hover:bg-white text-black">
                      <ChevronsRight />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </>
          ) : (
            <TableRow>
              <TableCell className="text-center" colSpan={6}>
                No Result Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {Pages > 1 && (
        <TablePagination
          activeNumber={currentPage}
          setActiveNumber={setCurrentPage}
          Pages={Pages}
        />
      )}
    </div>
  );
}
