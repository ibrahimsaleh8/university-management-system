import UserCardWithNameAndEmail from "@/app/dashboard/_components/UserCardWithNameAndEmail";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { GetDateFromTime } from "@/lib/GetDateFromTime";
import { CourseStudentDataType } from "./ShowCourseStudents";
import { useRef, useState } from "react";
import GlobalToast from "@/components/Global/GlobalToast";
import { UpdateStudentDegreeDataType } from "@/app/api/update/student-degree/route";
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorResponseType } from "@/lib/globalTypes";
import SmallLoader from "@/components/Global/SmallLoader";
type Props = {
  studentData: CourseStudentDataType;
  token: string;
  courseId: string;
};

async function updateStudentDegree(
  data: UpdateStudentDegreeDataType,
  token: string
) {
  await axios.patch(`${MainDomain}/api/update/student-degree`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export default function StudentTableRow({
  studentData,
  courseId,
  token,
}: Props) {
  const queryClient = useQueryClient();
  const degreeRef = useRef<HTMLInputElement>(null);
  const [studentDegree, setStudentDegree] = useState(
    studentData.finalGrade ?? 0
  );

  const { isPending, isSuccess, mutate } = useMutation({
    mutationFn: (updateParams: {
      data: UpdateStudentDegreeDataType;
      token: string;
    }) => updateStudentDegree(updateParams.data, updateParams.token),

    onSuccess: () => {
      GlobalToast({
        icon: "success",
        title: "Student degree updated successfully",
      });
      queryClient.refetchQueries({ queryKey: ["course_students", courseId] });
    },

    onError: (err: ErrorResponseType) => {
      GlobalToast({
        title: err.response.data.message,
        icon: "error",
      });
    },
  });

  const HandleSaveDegree = () => {
    if (studentDegree > 100) {
      GlobalToast({
        icon: "error",
        title: "Degree should't be more than 100",
      });
      degreeRef.current?.classList.add("border-red-500");
      degreeRef.current?.focus();
      return;
    }
    if (studentDegree < 0) {
      GlobalToast({
        icon: "error",
        title: "Degree should't be less than 0",
      });
      degreeRef.current?.classList.add("border-red-500");
      degreeRef.current?.focus();
      return;
    }
    degreeRef.current?.classList.remove("border-red-500");
    mutate({
      data: {
        courseId,
        degree: studentDegree,
        studentId: studentData.student.id,
      },
      token,
    });
  };

  return (
    <TableRow>
      <TableCell>
        <UserCardWithNameAndEmail
          email={studentData.student.email}
          image={studentData.student.image}
          name={`${studentData.student.first_name} ${studentData.student.last_name}`}
        />
      </TableCell>
      <TableCell>{GetDateFromTime(studentData.enrollmentDate)}</TableCell>
      <TableCell>
        <Badge
          className="capitalize"
          appearance="light"
          variant={
            studentData.status == "ACTIVE"
              ? "success"
              : studentData.status == "COMPLETED"
              ? "primary"
              : studentData.status == "WITHDRAWN"
              ? "warning"
              : "success"
          }>
          {studentData.status.toLowerCase()}
        </Badge>
      </TableCell>
      <TableCell>
        <Input
          ref={degreeRef}
          onChange={(e) => setStudentDegree(+e.target.value)}
          type="number"
          placeholder="Degree"
          className="w-28 border border-Second-black"
          defaultValue={studentData.finalGrade ?? 0}
          max={100}
          min={0}
        />
      </TableCell>
      <TableCell>
        <Button
          disabled={isPending || isSuccess}
          onClick={HandleSaveDegree}
          variant={"mainWithShadow"}>
          {isPending ? <SmallLoader /> : "Save"}
        </Button>
      </TableCell>
    </TableRow>
  );
}
