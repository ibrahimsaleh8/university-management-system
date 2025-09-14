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
import DeleteAlert from "@/app/dashboard/_components/DeleteAlert";
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import GlobalToast from "@/components/Global/GlobalToast";
import { ErrorResponseType } from "@/lib/globalTypes";
async function deleteAcademicYear(token: string, id: number) {
  await axios.delete(`${MainDomain}/api/delete/academic-year/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export default function TableShowYears({ token }: { token: string }) {
  const queryClient = useQueryClient();
  const { error, isError, isLoading, years } = GetAllYears();
  if (isError && error) throw new Error(error.message);

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (deleteParams: { token: string; id: number }) =>
      deleteAcademicYear(deleteParams.token, deleteParams.id),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["get_all_years"],
      });
      GlobalToast({
        title: "Academic Year has been deleted successfully",
        icon: "success",
      });
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({
        title: err.response.data.message,
        icon: "error",
      });
    },
  });

  return isLoading && !years ? (
    <TabelLoadingSkeleton coloumnNumber={5} rowNumber={5} />
  ) : (
    years && (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Label</TableHead>
            <TableHead>Level Number</TableHead>
            <TableHead>Students</TableHead>
            <TableHead>Action</TableHead>
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
                  <div className="flex items-center gap-3">
                    <ShowDetailsModel
                      title="Academic Years"
                      childComponent={
                        <EditAcademicYear token={token} yearData={year} />
                      }
                    />
                    <DeleteAlert
                      title=" Department"
                      isPending={isPending}
                      isSuccess={isSuccess}
                      deleteFn={() => {
                        mutate({
                          id: year.id,
                          token,
                        });
                      }}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="text-center p-4 text-low-white" colSpan={5}>
                No Years Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
  );
}
