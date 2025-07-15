import { timeConverter } from "@/lib/TimeConverter";
import { ClockArrowDown, ClockArrowUp, Hourglass, Medal } from "lucide-react";

type Props = {
  starting_on: string;
  ending_on: string;
  duration: number;
  full_mark: number;
};
export default function ExamInfo({
  duration,
  ending_on,
  full_mark,
  starting_on,
}: Props) {
  return (
    <div className="flex items-center flex-col  pb-3 sm:pr-24 flex-wrap  sm:flex-row gap-3 justify-between">
      {/* Left */}
      <div className="flex flex-col gap-3 w-full sm:w-fit">
        <p className="flex items-center gap-2">
          <span className="font-bold flex items-center gap-1">
            <ClockArrowUp className="w-5 h-5 text-main-text" />
            Starting on:
          </span>
          <span className="capitalize text-sm">
            {timeConverter(starting_on)}
          </span>
        </p>

        <p className="flex items-center gap-2">
          <span className="font-bold flex items-center gap-1">
            <ClockArrowDown className="w-5 h-5 text-red-500" />
            Ending on:
          </span>
          <span className="capitalize text-sm">{timeConverter(ending_on)}</span>
        </p>
      </div>

      {/* Right */}
      <div className="flex flex-col gap-3 w-full sm:w-fit">
        <p className="flex items-center gap-2">
          <span className="font-bold flex items-center gap-1">
            <Hourglass className="w-5 h-5 text-blue-600" />
            Duration:
          </span>
          <span className="capitalize text-sm">{duration} Minutes</span>
        </p>

        <p className="flex items-center gap-2">
          <span className="font-bold flex items-center gap-1">
            <Medal className="w-5 h-5 text-yellow-500" />
            Full Mark:
          </span>
          <span className="capitalize text-sm">{full_mark} Degrees</span>
        </p>
      </div>
    </div>
  );
}
