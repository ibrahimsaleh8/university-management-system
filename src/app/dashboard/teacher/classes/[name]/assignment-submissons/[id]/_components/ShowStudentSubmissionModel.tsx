import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Eye, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AssignmentSubmissionDataType } from "./StudentSubmissionsTable";
import ShowStudentSubmission from "./ShowStudentSubmission";
import AssignmentStatusPadge from "./AssignmentStatusPadge";
type Props = {
  submissionData: AssignmentSubmissionDataType;
  token: string;
  assignmentId: string;
};

export default function ShowStudentSubmissionModel({
  submissionData,
  token,
  assignmentId,
}: Props) {
  const [close, setClose] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (close && closeRef.current) {
      closeRef.current.click();
      setClose(false);
    }
  }, [close]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-transparent border border-main-text text-main-text hover:bg-main-text hover:text-black duration-300 ">
          <Eye />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center flex-wrap gap-3 justify-between">
            Student Submission
            <AssignmentStatusPadge status={submissionData.status} />
          </AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>

        <ShowStudentSubmission
          setClose={setClose}
          submissionData={submissionData}
          token={token}
          assignmentId={assignmentId}
        />

        <AlertDialogFooter>
          <AlertDialogCancel
            ref={closeRef}
            className="bg-red-500 h-7 w-7 rounded-sm !p-2 text-white border-red-500 hover:bg-red-600 hover:text-white duration-300 absolute top-2 right-2">
            <X />
          </AlertDialogCancel>{" "}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
