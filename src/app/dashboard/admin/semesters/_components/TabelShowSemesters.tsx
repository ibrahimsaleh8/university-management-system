"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { GetAllSemesters } from "@/lib/GetAllSemesters";
import TabelLoadingSkeleton from "@/app/dashboard/_components/TabelLoadingSkeleton";
import ShowDetailsModel from "@/app/dashboard/_components/ShowDetailsModel";
import UpdateSemester from "./UpdateSemester";
import { formatDeadline } from "@/lib/FormatDeadline";

export default function TabelShowSemesters({ token }: { token: string }) {
  const { error, isError, isLoading, semestersData } = GetAllSemesters();
  if (isError && error) throw new Error(error.message);

  return isLoading && !semestersData ? (
    <TabelLoadingSkeleton coloumnNumber={8} rowNumber={3} />
  ) : (
    semestersData && (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Register Start</TableHead>
            <TableHead>Register End</TableHead>
            <TableHead>Activation</TableHead>
            <TableHead>Info</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {semestersData.length > 0 ? (
            semestersData.map((smes, indx) => (
              <TableRow key={smes.id}>
                <TableCell>{indx + 1}</TableCell>
                <TableCell>{smes.name}</TableCell>
                <TableCell>{formatDeadline(smes.startDate)}</TableCell>
                <TableCell>{formatDeadline(smes.endDate)}</TableCell>
                <TableCell>{formatDeadline(smes.registerBegin)}</TableCell>
                <TableCell>{formatDeadline(smes.registerDeadline)}</TableCell>
                <TableCell>
                  {smes.isActive ? (
                    <Badge variant="success" appearance="light">
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="destructive" appearance="light">
                      Not Active
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <ShowDetailsModel
                    title="Semester Details"
                    childComponent={
                      <UpdateSemester semesterData={smes} token={token} />
                    }
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="text-center p-4 text-low-white" colSpan={8}>
                No Semesters Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
  );
}
