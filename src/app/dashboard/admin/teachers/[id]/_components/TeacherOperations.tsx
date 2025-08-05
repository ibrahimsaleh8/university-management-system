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
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import FormEditTeacher from "./FormEditTeacher";
import { EditTeacherDataType } from "@/validation/EditTeacherSchema";
import DeleteTeacher from "./DeleteTeacher";
type Props = {
  type: "edit" | "delete";
  teacherData?: EditTeacherDataType & { image: string };
  token: string;
  teacher_id?: string;
};
export default function TeacherOperations({
  type,
  teacherData,
  token,
  teacher_id,
}: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [isClose, setIsClose] = useState(false);
  useEffect(() => {
    if (isClose && closeRef) {
      closeRef.current?.click();
    }
  }, [isClose]);

  const classes =
    type == "edit"
      ? "border-main-text text-main-text hover:bg-main-text hover:text-black"
      : "border-red-500 text-red-500 hover:bg-red-500 hover:text-white";
  return (
    <AlertDialog onOpenChange={() => setIsClose(false)}>
      <AlertDialogTrigger
        className={`border px-4 py-1.5 rounded-sm cursor-pointer duration-300 w-full ${classes}`}>
        {type == "edit" && "Edit main Data"}
        {type == "delete" && "Delete Teacher"}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {type == "edit" && "Edit Teacher Main Data"}
            {type == "delete" && "Are you absolutely sure?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {type == "delete" &&
              "This action cannot be undone. This will permanently delete your account and remove your data from our servers."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {type == "edit" && teacherData && (
          <FormEditTeacher
            setIsClose={setIsClose}
            token={token}
            teacherData={teacherData}
          />
        )}
        {type == "delete" && teacher_id && (
          <DeleteTeacher
            setIsClose={setIsClose}
            teacher_id={teacher_id}
            token={token}
          />
        )}
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
