import { ReactNode } from "react";
import UserMainDetailsParagraph from "./UserMainDetailsParagraph";

type Props = {
  title: string;
  titleIcon: ReactNode;
  details: {
    header: string;
    value: string;
  }[];
  department: ReactNode;
};
export default function UserDetails({
  title,
  details,
  titleIcon,
  department,
}: Props) {
  return (
    <div className="bg-Second-black rounded-2xl lg:flex-1 w-full p-4 px-6 pb-10 flex flex-col gap-4">
      <p className="flex items-center gap-1 font-bold">
        {titleIcon}
        {title}
      </p>
      {/* Text */}
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 flex-wrap sm:gap-10 gap-5">
        {details.map((d, i) => (
          <UserMainDetailsParagraph header={d.header} value={d.value} key={i} />
        ))}
        {department}
      </div>
    </div>
  );
}
