"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronsRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GetAllSemesters } from "@/lib/GetAllSemesters";
import TabelLoadingSkeleton from "@/app/dashboard/_components/TabelLoadingSkeleton";

function timeConverter(time: string) {
  const t = new Date(time);
  return `${t.getDate()}/${t.getMonth() + 1}/${t.getFullYear()}`;
}

export default function TabelShowSemesters() {
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
                <TableCell>{timeConverter(smes.startDate)}</TableCell>
                <TableCell>{timeConverter(smes.endDate)}</TableCell>
                <TableCell>{timeConverter(smes.registerBegin)}</TableCell>
                <TableCell>{timeConverter(smes.registerDeadline)}</TableCell>
                <TableCell>
                  {smes.isActive ? (
                    <Badge variant={"active"}>Active</Badge>
                  ) : (
                    <Badge variant="destructive">Not Active</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Button className="bg-white hover:bg-white text-black">
                    <ChevronsRight />
                  </Button>
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
