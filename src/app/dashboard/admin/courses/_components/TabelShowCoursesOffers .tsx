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
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/animate-ui/radix/radio-group";
import { useMemo, useState } from "react";

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
  const [semesterFilter, setSemesterFilter] = useState<"active" | "all">(
    "active"
  );
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

  console.log("semesterFilter", semesterFilter);
  const coursesOffersShow = useMemo(() => {
    if (coursesOffers) {
      return semesterFilter == "active"
        ? coursesOffers.filter((c) => c.semester.isActive == true)
        : coursesOffers;
    }
  }, [coursesOffers, semesterFilter]);
  return isLoading && !coursesOffersShow ? (
    <TabelLoadingSkeleton coloumnNumber={8} rowNumber={3} />
  ) : (
    coursesOffersShow && (
      <div className="flex flex-col gap-2">
        <RadioGroup
          onValueChange={(e: "active" | "all") => setSemesterFilter(e)}
          defaultValue={semesterFilter}
          className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1">
            <RadioGroupItem value="active" id="active-semesters" />
            <label htmlFor="active-semesters">Current semeseter</label>
          </div>
          <div className="flex items-center gap-1">
            <RadioGroupItem value="all" id="all" />
            <label htmlFor="all">All</label>
          </div>
        </RadioGroup>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Academic Year</TableHead>
              <TableHead>Hall</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coursesOffersShow.length > 0 ? (
              coursesOffersShow.map((course) => (
                <TableRow key={course.id}>
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
                    <p className="pl-3 capitalize">
                      {`Dr. ${course.teacher.first_name} ${course.teacher.last_name}`}
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
                <TableCell
                  className="text-center p-4 text-low-white"
                  colSpan={8}>
                  No Courses Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    )
  );
}
