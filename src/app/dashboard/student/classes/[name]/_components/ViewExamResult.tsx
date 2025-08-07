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
type Props = {
  token: string;
  examId: string;
};
export default function ViewExamResult({}: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="text-main-text bg-transparent border border-main-text w-full hover:bg-main-text hover:text-black duration-300">
          View Results
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Your Exam Result</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>

        {/* Exam Result */}
        <div>Exam Result</div>

        <AlertDialogFooter>
          <AlertDialogCancel className="bg-red-500 h-7 w-7 rounded-sm !p-2 text-white border-red-500 hover:bg-red-600 hover:text-white duration-300 absolute sm:top-[-10px] sm:right-[-10px]  top-1 right-1">
            <X />
          </AlertDialogCancel>{" "}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
