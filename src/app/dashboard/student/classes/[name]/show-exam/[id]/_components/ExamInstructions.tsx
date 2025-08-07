import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ClipboardList } from "lucide-react";
export default function ExamInstructions() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-white text-black hover:bg-low-white hover:text-black duration-300">
          <ClipboardList />
          Instructions
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Exam Instructions</DialogTitle>
          <DialogDescription>
            Please read the following instructions carefully before starting
            your exam.
          </DialogDescription>

          <div className="max-h-96 md:max-h-fit overflow-y-auto">
            <ul className="list-disc pl-5 space-y-2 text-sm text-white">
              <li>
                <strong>Time Limit:</strong> You have{" "}
                <strong>[X] minutes</strong> to complete this exam. The
                countdown will start as soon as you begin.
              </li>
              <li>
                <strong>Auto-Submission:</strong> The exam will be{" "}
                <strong>automatically submitted</strong> once the time expires.
                You can also submit it manually at any time using the{" "}
                <em>Submit Exam</em> button.
              </li>
              <li>
                <strong>Single Attempt Only:</strong> You are allowed to take
                this exam <strong>once only</strong>. Multiple attempts are not
                permitted.
              </li>
              <li>
                <strong>Do Not Refresh or Close the Page:</strong> Refreshing,
                closing, or navigating away from the exam page may result in{" "}
                <strong>loss of progress</strong> or auto-submission.
              </li>
              <li>
                <strong>Internet Connection:</strong> A stable internet
                connection is required. Loss of connectivity may interrupt your
                exam.
              </li>
              <li>
                <strong>Academic Integrity:</strong> This is an individual exam.{" "}
                <strong>
                  Cheating, copying, or using unauthorized resources
                </strong>{" "}
                is strictly prohibited and may result in disqualification.
              </li>
              <li>
                <strong>Technical Issues:</strong> In case of any technical
                issues, please contact your instructor or technical support
                immediately.
              </li>
            </ul>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
