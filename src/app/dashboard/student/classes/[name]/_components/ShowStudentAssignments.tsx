"use client";
import { AssignmentSubmissionStatus } from "@/lib/globalTypes";
import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import StudentAssignment from "./StudentAssignment";
import { Skeleton } from "@/components/ui/skeleton";
export type assignmentSubmission = {
  id: string;
  submited_at: string;
  grade: number;
  status: AssignmentSubmissionStatus;
};
export type StudentAssignmentResponse = {
  id: string;
  title: string;
  description: string;
  deadline: string;
  created_at: string;
  isSubmited: boolean;
  isFinished: boolean;
  external_url?: string;
  submissionDetails: assignmentSubmission | null;
};

type Props = {
  name: string;
  token: string;
};
async function getAssignmentsApi(
  className: string,
  token: string
): Promise<StudentAssignmentResponse[]> {
  const res = await axios.get(
    `${MainDomain}/api/get/student-class/${className}/assignments`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}
export default function ShowStudentAssignments({ name, token }: Props) {
  const { error, isError, data, isLoading } = useQuery({
    queryKey: ["student_class_assignment", name],
    queryFn: () => getAssignmentsApi(name, token),
  });
  if (error && isError) throw new Error(error.message);
  console.log(data);

  return isLoading ? (
    <div className="flex flex-col gap-3 items-center">
      <Skeleton className="sm:w-[45rem] w-full max-w-full h-96" />
    </div>
  ) : data && data.length > 0 ? (
    <div className="flex flex-col gap-3 items-center">
      {data.map((assignment) => (
        <StudentAssignment
          className={name}
          key={assignment.id}
          token={token}
          assignmentData={assignment}
        />
      ))}
    </div>
  ) : (
    <>No Assignemts Created Yet</>
  );
}
