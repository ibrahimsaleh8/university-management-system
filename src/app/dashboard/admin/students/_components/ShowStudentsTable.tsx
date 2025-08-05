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
import { ChevronsRight } from "lucide-react";
import TabelSkeleton from "../../teachers/_components/TabelSkeleton";
import TablePagination from "../../teachers/_components/TablePagination";
import { useShowStudentsTable } from "@/hooks/useShowStudentsTable";
import { RadioGroup } from "@/components/animate-ui/radix/radio-group";
import GradeFilterationCard from "./GradeFilterationCard";
import { Skeleton } from "@/components/ui/skeleton";
import OperationsDropdown from "@/app/dashboard/_components/OperationsDropdown";
import MoveingToNextGrade from "./MoveingToNextGrade";
import Link from "next/link";

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
    setFilterGrade,
    loadingYears,
    years,
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

      {/* Check Year Filteration */}

      {loadingYears ? (
        <div className="flex items-center gap-2">
          <Skeleton className="w-20 h-7 rounded-md" />
          <Skeleton className="w-28 h-7 rounded-md" />
          <Skeleton className="w-28 h-7 rounded-md" />
          <Skeleton className="w-28 h-7 rounded-md" />
        </div>
      ) : (
        years &&
        years.length > 0 && (
          <div className="flex items-end justify-between">
            <RadioGroup
              defaultValue="all"
              onValueChange={(e) => setFilterGrade(e)}
              className="flex items-center gap-3 flex-wrap w-full">
              <GradeFilterationCard label="All" value="all" />

              {years
                .filter((y) => y.level_number != 0)
                .map((year) => (
                  <GradeFilterationCard
                    key={year.id}
                    label={year.year_label}
                    value={year.year_label}
                  />
                ))}
              <GradeFilterationCard
                label={years.filter((y) => y.level_number == 0)[0].year_label}
                value={years.filter((y) => y.level_number == 0)[0].year_label}
              />
            </RadioGroup>

            <OperationsDropdown
              verticalIcon={true}
              components={[
                ...years
                  .filter((y) => y.level_number != 0)
                  .map((year) => (
                    <MoveingToNextGrade
                      currentPage={currentPage}
                      token={token}
                      level_number={year.level_number}
                      yearLabel={year.year_label}
                      key={year.id}
                    />
                  )),
              ]}
            />
          </div>
        )
      )}

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
                    <Link
                      href={`/dashboard/admin/students/${std.student_id}`}
                      className="bg-white hover:bg-white text-black flex items-center justify-center w-fit px-3 py-1 rounded-md">
                      <ChevronsRight />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </>
          ) : (
            <TableRow>
              <TableCell className="text-center text-low-white" colSpan={6}>
                No Result Found...
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
