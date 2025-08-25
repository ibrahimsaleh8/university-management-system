"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GetAllMainCourses } from "@/lib/GetAllMainCourses";
import TabelLoadingSkeleton from "@/app/dashboard/_components/TabelLoadingSkeleton";
import ShowDetailsModel from "@/app/dashboard/_components/ShowDetailsModel";
import EditMainCourse from "./EditMainCourse";
import { Badge } from "@/components/ui/badge";
import DeleteAlert from "@/app/dashboard/_components/DeleteAlert";
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import GlobalToast from "@/components/Global/GlobalToast";
import { ErrorResponseType } from "@/lib/globalTypes";

async function deleteMainCourse(id: number, token: string) {
  await axios.delete(`${MainDomain}/api/delete/main-course/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export default function TableShowCourses({ token }: { token: string }) {
  const queryClient = useQueryClient();
  const { courses, error, isError, isLoading } = GetAllMainCourses();
  if (isError && error) throw new Error(error.message);

  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: (deleteParams: { id: number; token: string }) =>
      deleteMainCourse(deleteParams.id, deleteParams.token),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["get_all_courses"] });
      GlobalToast({
        icon: "success",
        title: "Course has been deleted successfully",
      });
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({
        title: err.response.data.message,
        icon: "error",
      });
    },
  });

  return isLoading && !courses ? (
    <TabelLoadingSkeleton coloumnNumber={7} rowNumber={3} />
  ) : (
    courses && (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Credits</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.length > 0 ? (
            courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="uppercase">{course.code}</TableCell>
                <TableCell>{course.name}</TableCell>
                <TableCell className="capitalize">
                  {course.department.name}
                </TableCell>
                <TableCell>{course.credit_hours}</TableCell>
                <TableCell>
                  {course.isElective ? (
                    <Badge variant="warning" appearance="light">
                      Elective
                    </Badge>
                  ) : (
                    <Badge variant="success" appearance="light">
                      Core
                    </Badge>
                  )}
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-3">
                    <ShowDetailsModel
                      title="Course Details"
                      childComponent={
                        <EditMainCourse courseData={course} token={token} />
                      }
                    />
                    <DeleteAlert
                      isSuccess={isSuccess}
                      isPending={isPending}
                      title="Course"
                      deleteFn={() => {
                        mutate({
                          id: course.id,
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
                No Courses Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
  );
}
