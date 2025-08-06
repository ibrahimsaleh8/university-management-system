import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
};
export default function ExamSmallParagraph({ icon, title }: Props) {
  return (
    <p className="flex items-center gap-1 text-low-white text-sm">
      {icon}
      {title}
    </p>
  );
}
