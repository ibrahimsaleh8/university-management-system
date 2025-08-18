import { ReactNode } from "react";

type Props = {
  title: string;
  icon: ReactNode;
  value: string;
};
export default function CourseSmallData({ icon, title, value }: Props) {
  return (
    <p className="flex items-center justify-between gap-1 text-sm">
      <span className="font-medium text-low-white flex items-center gap-3">
        {icon}
        {title}
      </span>
      <span className="font-medium">{value}</span>
    </p>
  );
}
