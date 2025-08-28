import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  header: string;
  value: string;
};
export default function TeacherContactInfo({ header, icon, value }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <p className="flex items-center gap-2 text-low-white text-sm capitalize">
        {icon}
        {header}
      </p>
      <p className="text-xs font-medium pl-6">{value}</p>
    </div>
  );
}
