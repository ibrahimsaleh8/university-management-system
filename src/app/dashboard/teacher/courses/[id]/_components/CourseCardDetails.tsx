import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  value: string;
};
export default function CourseCardDetails({ icon, title, value }: Props) {
  return (
    <div className="w-full bg-Second-black rounded-2xl flex flex-col items-center gap-3 p-3">
      {/* icon */}
      <div className="w-12 h-12 flex items-center justify-center bg-glass-green rounded-full">
        {icon}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-0.5 items-center text-center">
        <p className="text-sm text-low-white">{title}</p>
        <p className="font-bold capitalize">{value}</p>
      </div>
    </div>
  );
}
