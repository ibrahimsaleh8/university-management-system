"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StudentCardWithImage from "../../../show-exam/[id]/submissions/_components/StudentCardWithImage";
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import SmallLoader from "@/components/Global/SmallLoader";
import { AssignmentSubmissionStatus } from "@/lib/globalTypes";
import AssignmentStatusPadge from "./AssignmentStatusPadge";
import { timeConverter } from "@/lib/TimeConverter";
import ShowStudentSubmission from "./ShowStudentSubmission";
export type AssignmentSubmissionDataType = {
  id: string;
  external_url: string | null;
  grade: number;
  status: AssignmentSubmissionStatus;
  submited_at: Date;
  student: {
    first_name: string;
    last_name: string;
    student_id: string;
    image: string;
  };
};
type Props = {
  token: string;
  assignmentId: string;
};
export const dummyAssignmentSubmissions: AssignmentSubmissionDataType[] = [
  {
    id: "sub_001",
    external_url: "https://drive.google.com/file/d/abc123/view",
    grade: 95,
    status: "GRADED",
    submited_at: new Date("2025-08-10T14:30:00Z"),
    student: {
      first_name: "Omar",
      last_name: "Hassan",
      student_id: "STU12345",
      image: "https://i.ibb.co/kV27Z5B3/user-profile.jpg",
    },
  },
  {
    id: "sub_002",
    external_url: null,
    grade: 12,
    status: "SUBMITTED",
    submited_at: new Date("2025-08-12T09:15:00Z"),
    student: {
      first_name: "Mona",
      last_name: "Adel",
      student_id: "STU67890",
      image:
        "https://res.cloudinary.com/dnriyuqpv/image/upload/v1753721451/students/ivtc6zz25u1wnbu4dxij.png",
    },
  },
];

async function AssignmentSubmission(
  token: string,
  assignmentId: string
): Promise<AssignmentSubmissionDataType[]> {
  const res = await axios.get(
    `${MainDomain}/api/get/assignment/${assignmentId}/assignment-submissons`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}

export default function StudentSubmissionsTable({
  assignmentId,
  token,
}: Props) {
  const { error, isError, data, isLoading } = useQuery({
    queryKey: ["assignment_submissions", assignmentId],
    queryFn: () => AssignmentSubmission(token, assignmentId),
  });
  if (isError && error) throw new Error(error.message);
  return (
    <div className="p-5 flex flex-col gap-3">
      {/* Top */}
      <div className="flex items-center gap-3 justify-between flex-wrap">
        <p className="font-bold text-lg"> Submissions</p>

        <div className="bg-Second-Card-bg flex items-center gap-1 rounded-md pl-3">
          <Search className="w-4 h-4 text-low-white" />
          <Input
            placeholder="Search Student"
            className="bg-Second-Card-bg focus-visible:border-Second-Card-bg"
          />
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Submitted At</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Show</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && !isLoading ? (
            <TableRow>
              <TableCell colSpan={7}>
                <div className="flex items-center gap-1 text-low-white justify-center p-2">
                  <SmallLoader color="white" />
                  Loading...
                </div>
              </TableCell>
            </TableRow>
          ) : data && dummyAssignmentSubmissions.length > 0 ? (
            dummyAssignmentSubmissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell>
                  <StudentCardWithImage
                    id={submission.student.student_id}
                    imageUrl={submission.student.image}
                    name={`${submission.student.first_name} ${submission.student.last_name}`}
                  />
                </TableCell>
                <TableCell>
                  <p className="text-xs">
                    {timeConverter(submission.submited_at)}
                  </p>
                </TableCell>
                <TableCell>
                  <AssignmentStatusPadge status={submission.status} />
                </TableCell>
                <TableCell>{submission.grade} / 100</TableCell>
                <TableCell>
                  <ShowStudentSubmission
                    submissionData={submission}
                    token={token}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7}>
                <div className="flex items-center gap-1 text-low-white justify-center p-2">
                  No Submissions Found...
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
