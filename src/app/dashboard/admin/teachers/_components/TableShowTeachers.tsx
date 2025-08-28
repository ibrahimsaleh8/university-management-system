"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TablePagination from "./TablePagination";
import AddingModel from "../../../_components/forms/AddingModel";
import SearchInTeacherTable from "./SearchInTeacherTable";
import UserCardImageAndName from "@/app/dashboard/_components/UserCardImageAndName";
import ShowDetailsLink from "@/app/dashboard/_components/ShowDetailsLink";
import { useShowTeachers } from "./Hooks/useShowTeachers";
import TabelLoadingSkeleton from "@/app/dashboard/_components/TabelLoadingSkeleton";

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
  image: string;
};

export default function TableShowTeachers({ token }: Props) {
  const {
    setActivePaginateNumber,
    Pages,
    Data,
    isLoading,
    setSearched,
    setSearchedData,
    searched,
    activePaginateNumber,
  } = useShowTeachers();
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
        {isLoading ? (
          <TabelLoadingSkeleton coloumnNumber={5} rowNumber={3} />
        ) : (
          Data && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Teacher</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Qualification</TableHead>
                  <TableHead>Info</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Data.length > 0 ? (
                  Data.map((teacher) => (
                    <TableRow key={teacher.id}>
                      <TableCell>
                        <UserCardImageAndName
                          image={teacher.image}
                          name={`${teacher.first_name} ${teacher.last_name}`}
                        />
                      </TableCell>
                      <TableCell>{teacher.teacher_id}</TableCell>
                      <TableCell>{teacher.email}</TableCell>
                      <TableCell>{teacher.qualification}</TableCell>
                      <TableCell>
                        <ShowDetailsLink
                          url={`/dashboard/admin/teachers/${teacher.teacher_id}`}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center p-4 text-low-white">
                      No result found!
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )
        )}
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
