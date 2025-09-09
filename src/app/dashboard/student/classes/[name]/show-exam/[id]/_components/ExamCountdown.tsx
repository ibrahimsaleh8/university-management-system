import { useEffect, useState } from "react";
import { StudentAnswersDataType } from "./ShowQuestions";
import { SubmitStudentExam } from "@/lib/SubmitStudentExam";

type ExamCountdownProps = {
  enrollDate: Date;
  examDurationMinutes: number;
  token: string;
  examId: string;
  studentAnswers: StudentAnswersDataType[];
  className: string;
};

export default function ExamCountdown({
  enrollDate,
  examDurationMinutes,
  className,
  examId,
  studentAnswers,
  token,
}: ExamCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const { mutate } = SubmitStudentExam({ examId, className });

  useEffect(() => {
    const start = new Date(enrollDate).getTime();
    const end = start + examDurationMinutes * 60 * 1000;

    const updateCountdown = () => {
      const now = Date.now();
      const distance = end - now;

      if (distance <= 0) {
        setTimeLeft("Exam Ended");
        return;
      }

      const hours = Math.floor(distance / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(
        `${hours.toString().padStart(2, "0")}:` +
          `${minutes.toString().padStart(2, "0")}:` +
          `${seconds.toString().padStart(2, "0")}`
      );
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [enrollDate, examDurationMinutes]);

  useEffect(() => {
    if (timeLeft == "Exam Ended") {
      mutate({
        examId,
        studentAnswers,
        token,
      });
      localStorage.removeItem("student_answers");
    }
  }, [examId, mutate, studentAnswers, timeLeft, token]);

  return <div className="font-bold text-lg">{timeLeft}</div>;
}
