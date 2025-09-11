"use client";
import { Input } from "@/components/ui/input";
import { Eye, Search } from "lucide-react";
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
import ShowStudentSubmissionModel from "./ShowStudentSubmissionModel";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { AttachemntsFilesDataType } from "../../../../_components/TeacherClassAnnouncments";

type StudentData = {
  id: number;
  image: string;
  first_name: string;
  last_name: string;
  student_id: string;
};
export type AssignmentSubmissionDataType = {
  id: string;
  external_url: string;
  grade: number;
  status: AssignmentSubmissionStatus;
  submited_at: Date;
  student: StudentData;
  attachment: AttachemntsFilesDataType[];
};
type Props = {
  token: string;
  assignmentId: string;
};

async function AssignmentSubmission(
  token: string,
  assignmentId: string
): Promise<
  {
    student: StudentData;
    isSubmitted: boolean;
    submissionData?: AssignmentSubmissionDataType;
  }[]
> {
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
  const [searchTxt, setSearchTxt] = useState("");

  const students = useMemo(() => {
    if (data) {
      return searchTxt.trim().length > 0
        ? data.filter(
            (std) =>
              std.student.first_name
                .toLowerCase()
                .includes(searchTxt.toLowerCase()) ||
              std.student.last_name
                .toLowerCase()
                .includes(searchTxt.toLowerCase())
          )
        : data;
    }
  }, [data, searchTxt]);

  return (
    <div className="flex flex-col gap-3">
      {/* Top */}
      <div className="flex items-center gap-3 justify-between flex-wrap">
        <p className="font-bold text-lg"> Submissions</p>

        <div className="bg-Second-Card-bg flex items-center gap-1 rounded-md pl-3">
          <Search className="w-4 h-4 text-low-white" />
          <Input
            onChange={(e) => setSearchTxt(e.target.value)}
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
          {isLoading && !students ? (
            <TableRow>
              <TableCell colSpan={7}>
                <div className="flex items-center gap-3 text-low-white justify-center p-2">
                  <SmallLoader color="white" />
                  Loading...
                </div>
              </TableCell>
            </TableRow>
          ) : students && students.length > 0 ? (
            students.map((submission) => (
              <TableRow key={submission.student.id}>
                <TableCell>
                  <StudentCardWithImage
                    id={submission.student.student_id}
                    imageUrl={submission.student.image}
                    name={`${submission.student.first_name} ${submission.student.last_name}`}
                  />
                </TableCell>
                <TableCell>
                  {submission.submissionData ? (
                    <p className="text-xs">
                      {timeConverter(submission.submissionData.submited_at)}
                    </p>
                  ) : (
                    <p className="text-low-white">__</p>
                  )}
                </TableCell>
                <TableCell>
                  {submission.submissionData ? (
                    <AssignmentStatusPadge
                      status={submission.submissionData.status}
                    />
                  ) : (
                    <p className="font-medium text-xs w-fit rounded-sm px-3 py-1.5 bg-glass-red text-red-500">
                      Not Submitted
                    </p>
                  )}
                </TableCell>
                <TableCell>
                  {!submission.isSubmitted ? (
                    <p className="text-low-white"> _ / 100</p>
                  ) : (
                    submission.isSubmitted &&
                    submission.submissionData && (
                      <> {submission.submissionData.grade} / 100</>
                    )
                  )}
                </TableCell>
                <TableCell>
                  {submission.submissionData ? (
                    <ShowStudentSubmissionModel
                      assignmentId={assignmentId}
                      submissionData={submission.submissionData}
                      token={token}
                    />
                  ) : (
                    <Button disabled>
                      <Eye />
                    </Button>
                  )}
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
