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
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import StudentSubmitAssignmentForm from "./StudentSubmitAssignmentForm";

type Props = {
  assignmentId: string;
  token: string;
  className: string;
};

export default function SubmitAssignmentSubmisson({
  className,
  assignmentId,
  token,
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
        <Button variant={"mainWithShadow"}>Submit</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Submit Assignment</AlertDialogTitle>
          <AlertDialogDescription>
            Please make sure to paste the link to your assignment submission in
            this field.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <StudentSubmitAssignmentForm
          assignmentId={assignmentId}
          className={className}
          setClose={setClose}
          token={token}
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
