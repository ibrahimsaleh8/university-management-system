import React, { ReactNode } from "react";
type Props = {
  icon: ReactNode;
  title: string;
  value: number;
};
export default function DepartmentSmallInfo({ icon, title, value }: Props) {
  return (
    <div className="px-3 py-1 bg-Second-Card-bg rounded-sm w-fit flex items-center gap-2">
      {icon}
      <span>
        {title}: {value}
      </span>
    </div>
  );
}
