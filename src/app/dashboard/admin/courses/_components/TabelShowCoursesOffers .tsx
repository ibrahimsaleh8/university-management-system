"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GetAllCoursesOffering } from "@/lib/GetAllCoursesOffering";
import TabelLoadingSkeleton from "@/app/dashboard/_components/TabelLoadingSkeleton";
import { Badge } from "@/components/ui/badge";
import DeleteAlert from "@/app/dashboard/_components/DeleteAlert";
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import GlobalToast from "@/components/Global/GlobalToast";
import { ErrorResponseType } from "@/lib/globalTypes";

async function deleteCourseOffering(token: string, id: string) {
  await axios.delete(`${MainDomain}/api/delete/course-offering/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export default function TabelShowCoursesOffers({ token }: { token: string }) {
  const queryClient = useQueryClient();
  const { coursesOffers, error, isError, isLoading } = GetAllCoursesOffering();
  if (isError && error) throw new Error(error.message);

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: { token: string; id: string }) =>
      deleteCourseOffering(data.token, data.id),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["get_all_courses_offering"],
      });
      queryClient.refetchQueries({
        queryKey: ["get_active_semester_main_courses"],
      });
      GlobalToast({
        icon: "success",
        title: "Course offering has been deleted successfully",
      });
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({
        title: err.response.data.message,
        icon: "error",
      });
    },
  });

  return isLoading && !coursesOffers ? (
    <TabelLoadingSkeleton coloumnNumber={8} rowNumber={3} />
  ) : (
    coursesOffers && (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Academic Year</TableHead>
            <TableHead>Hall</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Semester</TableHead>
            <TableHead>Students</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coursesOffers.length > 0 ? (
            coursesOffers.map((course, indx) => (
              <TableRow key={course.id}>
                <TableCell>{indx + 1}</TableCell>
                <TableCell>{course.course.name}</TableCell>
                <TableCell>{course.academicYear.year_label}</TableCell>
                <TableCell>{course.hall}</TableCell>
                <TableCell>{course.maxCapacity}</TableCell>
                <TableCell className="text-sm">
                  <p className="flex items-center gap-2">
                    {course.semester.name}
                    {course.semester.isActive ? (
                      <Badge variant="success" appearance="light">
                        Activce
                      </Badge>
                    ) : (
                      <Badge variant="destructive" appearance="light">
                        Not Activce
                      </Badge>
                    )}
                  </p>
                </TableCell>
                <TableCell>
                  <p className="pl-3">{course._count.students}</p>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-3">
                    <DeleteAlert
                      isPending={isPending}
                      isSuccess={isSuccess}
                      title="Course offering"
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
              <TableCell className="text-center p-4 text-low-white" colSpan={8}>
                No Courses Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
  );
}
