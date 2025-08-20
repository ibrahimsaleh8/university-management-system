import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  value: string;
};
export default function AssignmentSmallInfo({ icon, title, value }: Props) {
  return (
    <div className="w-fit flex items-center gap-2 min-w-36">
      {/* Icon*/}
      <div className="w-12 h-12 bg-Main-black border border-soft-border rounded-md flex items-center justify-center">
        {icon}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-0">
        <p className="text-low-white font-medium text-sm capitalize">{title}</p>
        <p className="capitalize">{value}</p>
      </div>
    </div>
  );
}
