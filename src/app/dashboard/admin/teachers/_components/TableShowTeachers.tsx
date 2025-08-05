"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import { ChevronsRight } from "lucide-react";
import { useMemo, useState } from "react";
import TablePagination from "./TablePagination";
import TabelSkeleton from "./TabelSkeleton";
import { NumberOfTeachers } from "@/variables/Pagination";
import AddingModel from "../../../_components/forms/AddingModel";
import SearchInTeacherTable from "./SearchInTeacherTable";
import { GetTeachers } from "@/lib/GetTeachers";
import Link from "next/link";

type Props = {
  token: string;
};

export type TeachersDataType = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  teacher_id: string;
  qualification: string;
};

async function getNumberOfTeachers(): Promise<{ numbers: number }> {
  const res = await axios.get(`${MainDomain}/api/get/teachers-number`);
  return res.data;
}

export default function TableShowTeachers({ token }: Props) {
  const [activePaginateNumber, setActivePaginateNumber] = useState(1);
  const [searchedData, setSearchedData] = useState<TeachersDataType[] | null>(
    null
  );

  const [searched, setSearched] = useState(false);

  const { error, isError, isLoading, teachers } =
    GetTeachers(activePaginateNumber);

  if (error && isError) throw new Error(error.message);

  const { data: teachersNumber } = useQuery({
    queryKey: ["get_teacher_numbers"],
    queryFn: () => getNumberOfTeachers(),
  });

  const Data = useMemo(() => {
    let res = teachers;

    if (searchedData && searched) {
      res = searchedData;
    }

    return res;
  }, [searched, searchedData, teachers]);
  const Pages = useMemo(() => {
    return teachersNumber
      ? Math.ceil(teachersNumber.numbers / NumberOfTeachers)
      : 0;
  }, [teachersNumber]);

  return (
    <div className="flex flex-col gap-3">
      {/* Search & add */}
      <div className="flex sm:items-center flex-wrap gap-3 justify-between sm:flex-row flex-col">
        {/* Search */}
        <SearchInTeacherTable
          searched={searched}
          setSearched={setSearched}
          setSearchedData={setSearchedData}
        />
        <AddingModel AddType="Teacher" token={token} />
      </div>

      <div className="flex flex-col gap-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Qualification</TableHead>
              <TableHead>Info</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <TabelSkeleton />
                </TableCell>
              </TableRow>
            ) : Data && Data.length > 0 ? (
              Data.map((teacher, i) => (
                <TableRow key={teacher.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{teacher.teacher_id}</TableCell>
                  <TableCell>{`${teacher.first_name} ${teacher.last_name}`}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>{teacher.qualification}</TableCell>
                  <TableCell>
                    <Link
                      href={`/dashboard/admin/teachers/${teacher.teacher_id}`}
                      className="bg-white flex items-center justify-center rounded-md w-10 h-8 hover:bg-white text-black">
                      <ChevronsRight className="w-5 h-5" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No result found!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {Pages > 1 && !searched && (
          <TablePagination
            setActiveNumber={setActivePaginateNumber}
            activeNumber={activePaginateNumber}
            Pages={Pages}
          />
        )}
      </div>
    </div>
  );
}
