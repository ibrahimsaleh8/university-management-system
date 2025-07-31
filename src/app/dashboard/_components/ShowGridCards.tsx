import { ReactNode } from "react";
type Props = {
  children: ReactNode;
  minWidth: number;
  gap: number;
};
export default function ShowGridCards({ children, gap, minWidth }: Props) {
  return (
    <div
      style={{
        display: "grid",
        gap: `${gap}px`,
        gridTemplateColumns: `repeat(auto-fit,minmax(${minWidth}px , 1fr))`,
      }}>
      {children}
    </div>
  );
}
