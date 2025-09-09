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
import { Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AddAssignmentForm from "./AddAssignmentForm";

type Props = {
  classId: number;
  className: string;
  token: string;
};

export default function AddAssignment({ classId, token, className }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [close, setClose] = useState(false);

  useEffect(() => {
    if (close) {
      closeRef.current?.click();
    }
  }, [close]);

  return (
    <AlertDialog onOpenChange={() => setClose(false)}>
      <AlertDialogTrigger className="flex items-center gap-1 bg-transparent font-medium cursor-pointer text-sm text-main-text px-4 py-2 border border-main-text hover:bg-main-text hover:text-Main-black duration-300 rounded-sm sm:w-fit w-full">
        <Plus className="w-4 h-4" />
        Add Assignment
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add New Assignment</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <AddAssignmentForm
          setClose={setClose}
          classId={classId}
          className={className}
          token={token}
        />
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
