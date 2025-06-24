"use client";

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
import TabelSkeleton from "../../teachers/_components/TabelSkeleton";
import { Button } from "@/components/ui/button";
import { ChevronsRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
type semesterDataType = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  registerBegin: string;
  registerDeadline: string;
  isActive: boolean;
};

async function getAllSemesters(): Promise<semesterDataType[]> {
  const res = await axios.get(`${MainDomain}/api/get/semester`);
  return res.data;
}

function timeConverter(time: string) {
  const t = new Date(time);
  return `${t.getDate()}/${t.getMonth() + 1}/${t.getFullYear()}`;
}

export default function TabelShowSemesters() {
  const {
    data: semestersData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["get_all_semesters"],
    queryFn: getAllSemesters,
  });
  if (isError) throw new Error(error.message);
  return (
    <div>
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
          {isLoading && !semestersData ? (
            <TableRow>
              <TableCell colSpan={7}>
                <TabelSkeleton />
              </TableCell>
            </TableRow>
          ) : semestersData && semestersData.length > 0 ? (
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
                    <>
                      <Badge variant={"active"}>Active</Badge>
                    </>
                  ) : (
                    <>
                      <Badge variant="destructive">Not Active</Badge>
                    </>
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
              <TableCell className="text-center" colSpan={7}>
                No Semesters Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
