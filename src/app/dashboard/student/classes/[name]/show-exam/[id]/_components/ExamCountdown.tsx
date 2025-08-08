import React, { useEffect, useState } from "react";

type ExamCountdownProps = {
  enrollDate: Date; // e.g. "2025-08-10T14:00:00Z"
  examDurationMinutes: number; // e.g. 90 (1.5 hours)
};

export default function ExamCountdown({
  enrollDate,
  examDurationMinutes,
}: ExamCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<string>("");

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

  return <div className="font-mono text-lg">{timeLeft}</div>;
}
