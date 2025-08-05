import { ReactNode } from "react";

type Props = {
  head: string;
  content: string;
  icon: ReactNode;
};
export default function DetailsParagraphInfo({ content, head, icon }: Props) {
  return (
    <p className="pb-3 border-b border-soft-border flex items-center gap-1 line-clamp-1">
      {icon}
      <span className="font-bold capitalize">{head}:</span>{" "}
      <span className="line-clamp-1"> {content}</span>
    </p>
  );
}
