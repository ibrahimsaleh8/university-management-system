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
import { PencilLine, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import FormEditTeacher from "../../admin/teachers/[id]/_components/FormEditTeacher";
import { EditTeacherDataType } from "@/validation/EditTeacherSchema";
import DeleteTeacher from "../../admin/teachers/[id]/_components/DeleteTeacher";
import { Button } from "@/components/ui/button";
import EditStudentForm from "../../admin/students/[id]/_components/EditStudentForm";
import { editStudentDataType } from "@/validation/EditStudentSchema";
type Props = {
  type: "edit" | "delete";
  teacherData?: EditTeacherDataType & { image: string };
  token: string;
  teacher_id?: string;
  studentData?: editStudentDataType;
  student_id?: string;
};
export default function UserOperations({
  type,
  teacherData,
  token,
  teacher_id,
  studentData,
}: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [isClose, setIsClose] = useState(false);
  useEffect(() => {
    if (isClose && closeRef) {
      closeRef.current?.click();
    }
  }, [isClose]);

  return (
    <AlertDialog onOpenChange={() => setIsClose(false)}>
      <AlertDialogTrigger asChild>
        {type == "edit" ? (
          <Button variant={"mainWithShadow"}>
            <PencilLine />
            Edit Profile
          </Button>
        ) : (
          <Button className="mt-1" variant={"destructive"}>
            <Trash2 />
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {type == "edit" && "Edit Main Data"}
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
        {type == "edit" && studentData && (
          <EditStudentForm
            setClose={setIsClose}
            token={token}
            studentDeafultData={studentData}
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
