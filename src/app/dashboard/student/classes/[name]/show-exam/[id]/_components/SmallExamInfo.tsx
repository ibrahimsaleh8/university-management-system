import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  value: string;
};
export default function SmallExamInfo({ icon, title, value }: Props) {
  return (
    <div className="flex items-start gap-1">
      <p className="p-1 rounded-full w-10 h-10 bg-Main-black flex items-center justify-center">
        {icon}
      </p>

      <div className="flex flex-col gap-0 font-medium">
        <p className="text-xs text-low-white capitalize">{title}</p>
        <p className="font-bold text-sm">{value}</p>
      </div>
    </div>
  );
}
