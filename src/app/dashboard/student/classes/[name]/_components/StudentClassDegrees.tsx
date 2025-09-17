"use client";
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
import ShowStudentClassMarksDetails from "./ShowStudentClassMarksDetails";

type Props = {
  token: string;
  stdId: number;
  className: string;
};

export default function StudentClassDegrees({
  className,
  stdId,
  token,
}: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-main-text text-black hover:bg-main-text hover:text-black hover:opacity-85">
          Show Marks
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Student Marks Details</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <ShowStudentClassMarksDetails
          className={className}
          stdId={stdId}
          token={token}
        />

        <AlertDialogFooter>
          <AlertDialogCancel className="bg-red-500 h-7 w-7 rounded-sm !p-2 text-white border-red-500 hover:bg-red-600 hover:text-white duration-300 absolute top-2 right-2">
            <X />
          </AlertDialogCancel>{" "}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
