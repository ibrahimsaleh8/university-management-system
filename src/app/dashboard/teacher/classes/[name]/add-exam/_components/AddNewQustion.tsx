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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ExamQuestionType } from "@/lib/globalTypes";
import { ExamDataType } from "@/validation/AddExamValidation";
import { Plus, X } from "lucide-react";
import { useRef, useState } from "react";
import { UseFieldArrayAppend } from "react-hook-form";
type Props = {
  append: UseFieldArrayAppend<ExamDataType>;
};
export default function AddNewQustion({ append }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [questionType, setQuestionType] = useState<ExamQuestionType | null>(
    null
  );
  return (
    <AlertDialog onOpenChange={() => setQuestionType(null)}>
      <AlertDialogTrigger asChild>
        <Button
          className="text-main-text w-56 mx-auto bg-transparent border border-main-text hover:bg-main-text hover:text-black duration-300 font-bold"
          type="button">
          <Plus />
          Add Another Question
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add New Question</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>

          <div className="flex items-end gap-5 justify-between flex-col sm:flex-row">
            {/* Qusetion Type */}
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="Qtype" className="text-sm">
                Question Type:
              </label>
              <Select
                onValueChange={(e: ExamQuestionType) => setQuestionType(e)}>
                <SelectTrigger id="Qtype" className="w-full bg-Second-Card-bg">
                  <SelectValue placeholder="Question Type" />
                </SelectTrigger>
                <SelectContent className="bg-Second-Card-bg">
                  <SelectItem value="CHOOSE">Multiple Choice</SelectItem>
                  <SelectItem value="TRUE_FALSE">True / False</SelectItem>
                  <SelectItem value="WRITE">Written Answer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              className="bg-white text-black hover:bg-white hover:text-black sm:w-32 w-full"
              type="button"
              disabled={!questionType}
              onClick={() => {
                if (questionType) {
                  closeRef.current?.click();
                  append({
                    type: questionType,
                    mark: 0,
                    question: "",
                    rightAnswer: "",
                    chooses: [],
                  });
                }
              }}>
              <Plus />
              Add
            </Button>
          </div>
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
