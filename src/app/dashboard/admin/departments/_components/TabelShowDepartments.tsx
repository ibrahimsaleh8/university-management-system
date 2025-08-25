"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GetDepartmentsQuery } from "@/lib/GetDepartmentsQuery";
import TabelLoadingSkeleton from "@/app/dashboard/_components/TabelLoadingSkeleton";
import ShowDetailsModel from "@/app/dashboard/_components/ShowDetailsModel";
import EditDepartment from "./EditDepartment";
import DeleteAlert from "@/app/dashboard/_components/DeleteAlert";
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import GlobalToast from "@/components/Global/GlobalToast";
import { ErrorResponseType } from "@/lib/globalTypes";
async function deleteDepartment(id: number, token: string) {
  await axios.delete(`${MainDomain}/api/delete/department/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export default function TabelShowDepartments({ token }: { token: string }) {
  const queryClient = useQueryClient();
  const { departments, error, isError, isLoading } = GetDepartmentsQuery();
  if (isError && error) throw new Error(error.message);
  const { isPending, isSuccess, mutate } = useMutation({
    mutationFn: (deleteParams: { id: number; token: string }) =>
      deleteDepartment(deleteParams.id, deleteParams.token),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["get_all_departments"],
      });
      GlobalToast({
        title: "Department has been deleted successfully",
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
  return isLoading && !departments ? (
    <TabelLoadingSkeleton coloumnNumber={7} rowNumber={3} />
  ) : (
    departments && (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Teachers</TableHead>
            <TableHead>Students</TableHead>
            <TableHead>Courses</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {departments.length > 0 ? (
            departments.map((dep, indx) => (
              <TableRow key={dep.id}>
                <TableCell>{indx + 1}</TableCell>
                <TableCell className="capitalize">{dep.name}</TableCell>
                <TableCell className="uppercase">{dep.code}</TableCell>
                <TableCell>{dep._count.teachers}</TableCell>
                <TableCell>{dep._count.students}</TableCell>
                <TableCell>{dep._count.courses}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <ShowDetailsModel
                      title="Department Details"
                      childComponent={
                        <EditDepartment departmentData={dep} token={token} />
                      }
                    />
                    <DeleteAlert
                      title=" Department"
                      isPending={isPending}
                      isSuccess={isSuccess}
                      deleteFn={() => {
                        mutate({
                          id: dep.id,
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
              <TableCell className="text-center p-4 text-low-white" colSpan={7}>
                No Departments Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
  );
}
