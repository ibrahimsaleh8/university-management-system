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
import { Pencil, Trash2, X } from "lucide-react";
import EditAssignmentForm from "./EditAssignmentForm";
import { updateAssignmentDataType } from "@/validation/EditAssignmentSchema";
import { useEffect, useRef, useState } from "react";
import DeleteAssignment from "./DeleteAssignment";
import { AttachemntsFilesDataType } from "./TeacherClassAnnouncments";
type Props = {
  type: "edit" | "delete";
  assignmentData?: updateAssignmentDataType & { id: string };
  token: string;
  className: string;
  assignmentId?: string;
  attachments?: AttachemntsFilesDataType[];
};
export default function AssignmentModel({
  type,
  assignmentData,
  token,
  className,
  assignmentId,
  attachments,
}: Props) {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const [close, setClose] = useState(false);
  useEffect(() => {
    if (close) {
      closeRef.current?.click();
    }
  }, [close]);

  const classes =
    type == "edit"
      ? "border-main-text text-main-text hover:bg-main-text hover:text-black"
      : type == "delete"
      ? "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
      : "";
  return (
    <AlertDialog onOpenChange={() => setClose(false)}>
      <AlertDialogTrigger
        className={`cursor-pointer flex items-center gap-2 border w-full px-4 py-1 rounded-md text-sm  font-medium duration-300 ${classes}`}>
        {type == "edit" && (
          <>
            <Pencil className="w-4 h-4" />
            Edit Assignment
          </>
        )}
        {type == "delete" && (
          <>
            <Trash2 className="w-4 h-4" />
            Delete
          </>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {type == "edit" && "Edit Assignment"}
            {type == "delete" && "Delete Assignment"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {type == "delete" &&
              "Are you sure you want to delete this assignment? This action cannot be undone."}
          </AlertDialogDescription>

          {type == "edit" && assignmentData && attachments && (
            <EditAssignmentForm
              className={className}
              setClose={setClose}
              data={assignmentData}
              token={token}
              attachments={attachments}
            />
          )}
          {type == "delete" && assignmentId && (
            <DeleteAssignment
              assignmentId={assignmentId}
              className={className}
              token={token}
              setClose={setClose}
            />
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            ref={closeRef}
            className="bg-red-500 h-7 w-7 rounded-sm !p-2 text-white border-red-500 hover:bg-red-600 hover:text-white duration-300 absolute sm:top-[-10px] sm:right-[-10px]  top-1 right-1">
            <X />
          </AlertDialogCancel>{" "}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
