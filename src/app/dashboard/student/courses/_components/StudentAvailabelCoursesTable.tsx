import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CourseOfferingResponse } from "./RegisterAvailabelCourses";
import { Button } from "@/components/ui/button";
import { ClockArrowDown, ClockArrowUp, Plus } from "lucide-react";
import { IoAlert } from "react-icons/io5";

import { GetDateFromTime } from "@/lib/GetDateFromTime";
import { differenceInHours } from "date-fns";
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import GlobalToast from "@/components/Global/GlobalToast";
import { ErrorResponseType } from "@/lib/globalTypes";
import SmallLoader from "@/components/Global/SmallLoader";
import RemoveRegisterCourse from "./RemoveRegisterCourse";
import { TotalCreditHoursCanRegister } from "@/variables/TotalCreditHoursCanRegister";
type Props = {
  courseData: CourseOfferingResponse;
  token: string;
};

async function registerToCourse(
  courseId: string,
  token: string
): Promise<{ message: string }> {
  const res = await axios.post(
    `${MainDomain}/api/create/student-register-course`,
    {
      courseId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}

export default function StudentAvailabelCoursesTable({
  courseData,
  token,
}: Props) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (p: { courseId: string; token: string }) =>
      registerToCourse(p.courseId, p.token),
    onSuccess: (res) => {
      queryClient.refetchQueries({
        queryKey: ["get_availabel_courses_for_register"],
      });
      queryClient.refetchQueries({
        queryKey: ["show_registerd_courses"],
      });
      GlobalToast({
        icon: "success",
        title: res.message,
      });
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({
        icon: "error",
        title: err.response.data.message,
      });
    },
  });

  const isPassed = differenceInHours(
    new Date(courseData.courses[0].semester.registerDeadline),
    new Date()
  );

  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center relative flex-wrap justify-between bg-Second-black p-3 rounded-md">
        {/* Icon */}
        <p className="p-1 rounded-full w-5 h-5 bg-blue-600 absolute left-0 top-[-5px] flex items-center justify-center">
          <IoAlert className="w-4 h-4 text-white" />
        </p>
        <p className="font-bold">{courseData.courses[0].semester.name}</p>
        <div className="flex flex-col gap-1">
          <p className="text-sm flex items-center gap-1">
            <ClockArrowUp className="w-4 h-4 text-main-text" />
            Register Begin in:{" "}
            {GetDateFromTime(courseData.courses[0].semester.registerBegin)}
          </p>
          <p className="text-sm flex items-center gap-1">
            <ClockArrowDown className="w-4 h-4 text-red-500" />
            Register End in:{" "}
            {GetDateFromTime(courseData.courses[0].semester.registerDeadline)}
          </p>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Hours</TableHead>
            <TableHead>Pre Required Courses</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Operations</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courseData.courses.map((course, index) => (
            <TableRow key={course.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {course.course_name} - [{course.course_code}]{" "}
                {course.course_isElective && (
                  <span className="text-sm text-low-white font-medium">
                    (Elective)
                  </span>
                )}
              </TableCell>

              <TableCell>{course.course_department}</TableCell>
              <TableCell>{course.course_hours}</TableCell>
              <TableCell>
                {course.requiredCourses.length > 0
                  ? course.requiredCourses[0].name
                  : "No Prerequisites"}
              </TableCell>
              <TableCell>
                {course.registerd.toFixed(0)}/ {course.maxCapacity}
              </TableCell>
              <TableCell className="py-3">
                {isPassed < 0 ? (
                  <p className="text-sm text-red-500">Registerd End</p>
                ) : !course.isEnrolled ? (
                  <Button
                    disabled={
                      isPending ||
                      courseData.totalRegisterdHours + course.course_hours >
                        TotalCreditHoursCanRegister
                    }
                    onClick={() => {
                      mutate({
                        courseId: course.id,
                        token,
                      });
                    }}
                    className="bg-white text-black h-8 hover:bg-white border border-white hover:text-black duration-300">
                    {isPending ? (
                      <>
                        Adding <SmallLoader />
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5" /> Register
                      </>
                    )}
                  </Button>
                ) : (
                  <RemoveRegisterCourse id={course.id} token={token} />
                )}
                {courseData.totalRegisterdHours + course.course_hours >
                  TotalCreditHoursCanRegister && (
                  <p className="text-xs w-16 mt-1 text-red-400">
                    You {"can't"} register more than{" "}
                    {TotalCreditHoursCanRegister} Hours
                  </p>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
