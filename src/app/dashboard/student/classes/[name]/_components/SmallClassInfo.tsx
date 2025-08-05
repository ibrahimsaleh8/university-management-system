import { ReactNode } from "react";

type Props = {
  text: string;
  icon: ReactNode;
};
export default function SmallClassInfo({ icon, text }: Props) {
  return (
    <p className="flex items-center gap-1 text-sm font-medium capitalize">
      {icon}
      {text}
    </p>
  );
}
