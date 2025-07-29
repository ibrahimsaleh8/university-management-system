import { ReactNode } from "react";

type Props = {
  leftData: ReactNode[];
  rightData: ReactNode[];
};

export default function DetailsMainData({ leftData, rightData }: Props) {
  return (
    <div className="flex items-start md:gap-[1%] gap-3 p-4 flex-wrap">
      <div className="flex flex-col gap-3 md:w-[48%] w-full">
        {leftData.map((component, i) => (
          <div key={i}>{component}</div>
        ))}
      </div>
      <div className="flex flex-col gap-3 md:w-[48%] w-full">
        {rightData.map((component, i) => (
          <div key={i}>{component}</div>
        ))}
      </div>
    </div>
  );
}
