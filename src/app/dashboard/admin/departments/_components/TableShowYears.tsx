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
import { GetAllYears } from "@/lib/GetAllYears";

export default function TableShowYears() {
  const { error, isError, isLoading, years } = GetAllYears();
  if (isError && error) throw new Error(error.message);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Label</TableHead>
            <TableHead>Number</TableHead>
            <TableHead>Students</TableHead>
            <TableHead>Info</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && !years ? (
            <TableRow>
              <TableCell colSpan={5}>
                <TabelSkeleton count={4} />
              </TableCell>
            </TableRow>
          ) : years && years.length > 0 ? (
            years.map((year, indx) => (
              <TableRow key={year.id}>
                <TableCell>{indx + 1}</TableCell>
                <TableCell>{year.year_label}</TableCell>
                <TableCell>{year.level_number}</TableCell>
                <TableCell>{year._count.students}</TableCell>
                <TableCell>
                  <Button className="bg-white hover:bg-white text-black">
                    <ChevronsRight />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7}>No Years Found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
