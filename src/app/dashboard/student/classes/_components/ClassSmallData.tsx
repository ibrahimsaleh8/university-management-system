import { ReactNode } from "react";

type Props = {
  text: string;
  number?: number;
  icon: ReactNode;
};
export default function ClassSmallData({ icon, text, number }: Props) {
  return (
    <p className="text-xs flex items-center gap-1 capitalize">
      {icon}
      {text}
      {number != undefined && <>: {number}</>}
    </p>
  );
}
