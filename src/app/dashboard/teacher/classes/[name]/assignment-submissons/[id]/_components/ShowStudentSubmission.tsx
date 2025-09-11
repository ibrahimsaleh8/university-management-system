import { Link as LinkIcon } from "lucide-react";
import StudentCardWithImage from "../../../show-exam/[id]/submissions/_components/StudentCardWithImage";
import { AssignmentSubmissionDataType } from "./StudentSubmissionsTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useRef } from "react";
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorResponseType } from "@/lib/globalTypes";
import GlobalToast from "@/components/Global/GlobalToast";
import SmallLoader from "@/components/Global/SmallLoader";
import ShowAttachments from "@/app/dashboard/_components/ShowAttachments";

type Props = {
  submissionData: AssignmentSubmissionDataType;
  token: string;
  setClose: Dispatch<SetStateAction<boolean>>;
  assignmentId: string;
};
async function updateSubmissionGrade(
  grade: number,
  token: string,
  submissionId: string
) {
  await axios.patch(
    `${MainDomain}/api/update/student-assignment-submission/${submissionId}`,
    {
      grade,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export default function ShowStudentSubmission({
  submissionData,
  assignmentId,
  setClose,
  token,
}: Props) {
  const queryClient = useQueryClient();
  const gradeInputRef = useRef<HTMLInputElement>(null);

  const { isPending, mutate } = useMutation({
    mutationFn: (data: {
      grade: number;
      token: string;
      submissionId: string;
    }) => updateSubmissionGrade(data.grade, data.token, data.submissionId),
    onError: (err: ErrorResponseType) => {
      GlobalToast({
        title: err.response.data.message,
        icon: "error",
      });
    },

    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["assignment_submissions", assignmentId],
      });
      GlobalToast({
        title:
          submissionData.status == "SUBMITTED"
            ? "Submission graded successfully"
            : "Grade has been updated",
        icon: "success",
      });
      setClose(true);
    },
  });
  const showError = (msg: string) => {
    GlobalToast({ icon: "warning", title: msg });
    gradeInputRef.current?.classList.add("!border-red-500");
    gradeInputRef.current?.focus();
  };

  const handleUpdateGrade = () => {
    const grade = gradeInputRef.current?.value;
    if (!grade) return showError("Grade shouldn't be empty");
    if (+grade > 100 || +grade < 0)
      return showError("Grade must be between 0 and 100");

    gradeInputRef.current?.classList.remove("!border-red-500");
    mutate({
      grade: +grade,
      submissionId: submissionData.id,
      token,
    });
  };

  console.log("submissionData", submissionData);

  return (
    <div className="flex flex-col gap-4">
      {/* Top */}
      <div className="flex items-center gap-3 justify-between flex-wrap">
        <div className="flex flex-col gap-0.5 font-bold">
          <p>Grade</p>

          {submissionData.status == "SUBMITTED" ? (
            <p className="text-low-white"> _ / 100</p>
          ) : (
            <p className="text-main-text">{submissionData.grade} / 100</p>
          )}
        </div>

        <div className="bg-Second-Card-bg w-fit p-2 rounded-md">
          <StudentCardWithImage
            id={submissionData.student.student_id}
            imageUrl={submissionData.student.image}
            name={`${submissionData.student.first_name} ${submissionData.student.last_name}`}
          />
        </div>
      </div>

      {/* Student Answer Url */}
      <div className="bg-Second-Card-bg p-4 rounded-md flex flex-col gap-2">
        <p className="font-medium text-low-white">Student Answer Url:</p>
        <a
          target="_blank"
          href={submissionData.external_url}
          className="text-sm flex items-center gap-1 text-main-text hover:underline">
          <LinkIcon className="w-3 h-3" />
          Show Answer
        </a>
      </div>

      <ShowAttachments
        fullView={false}
        attachments={submissionData.attachment}
      />

      {/* Mark Answer */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="mark-ans">Answer Mark:</label>
          <Input
            className="border "
            ref={gradeInputRef}
            min={0}
            max={100}
            id="mark-ans"
            type="number"
            placeholder="Mark the Answer"
          />
        </div>
        <Button
          onClick={handleUpdateGrade}
          variant={"mainWithShadow"}
          disabled={isPending}>
          {isPending ? <SmallLoader /> : "Save"}
        </Button>
      </div>
    </div>
  );
}
