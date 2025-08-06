import React, { useEffect, useState } from "react";

type CountdownTimerProps = {
  targetDate: string; // Accept ISO string
};

const calculateTimeLeft = (targetDate: Date) => {
  const difference = +targetDate - +new Date();
  if (difference <= 0) return null;

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

export default function CountDownTime({ targetDate }: CountdownTimerProps) {
  const parsedTargetDate = new Date(targetDate);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(parsedTargetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(parsedTargetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft)
    return (
      <div className="text-red-600 font-semibold text-sm animate-bounce line-clamp-1">
        {"Time's"} up! Make Refresh To Open the exam
      </div>
    );

  return (
    <div className="flex gap-2 text-lg font-semibold">
      <span>{timeLeft.days}d</span>
      <span>{timeLeft.hours}h</span>
      <span>{timeLeft.minutes}m</span>
      <span>{timeLeft.seconds}s</span>
    </div>
  );
}
