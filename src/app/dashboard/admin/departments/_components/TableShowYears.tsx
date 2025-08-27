"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GetAllYears } from "@/lib/GetAllYears";
import TabelLoadingSkeleton from "@/app/dashboard/_components/TabelLoadingSkeleton";
import ShowDetailsModel from "@/app/dashboard/_components/ShowDetailsModel";
import EditAcademicYear from "./EditAcademicYear";

export default function TableShowYears({ token }: { token: string }) {
  const { error, isError, isLoading, years } = GetAllYears();
  if (isError && error) throw new Error(error.message);

  return isLoading && !years ? (
    <TabelLoadingSkeleton coloumnNumber={6} rowNumber={5} />
  ) : (
    years && (
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
          {years.length > 0 ? (
            years.map((year, indx) => (
              <TableRow key={year.id}>
                <TableCell>{indx + 1}</TableCell>
                <TableCell>{year.year_label}</TableCell>
                <TableCell>{year.level_number}</TableCell>
                <TableCell>{year._count.students}</TableCell>
                <TableCell>
                  <div>
                    <ShowDetailsModel
                      title="Academic Years"
                      childComponent={
                        <EditAcademicYear token={token} yearData={year} />
                      }
                    />
                  </div>
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
    )
  );
}
