import { SlidingNumber } from "@/components/animate-ui/text/sliding-number";
import { ReactNode } from "react";
type Props = {
  title: string;
  numbers: number;
  describtion: string;
  icon: ReactNode;
  stringValue?: string;
};
export default function DashboardCard({
  describtion,
  numbers,
  title,
  icon,
  stringValue,
}: Props) {
  return (
    <div className="w-full min-h-36 bg-Second-black text-white rounded-2xl flex flex-col gap-4 py-4 px-6 relative">
      {/* Text */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-4 pb-4">
          <div className="flex flex-col gap-2">
            <p className="capitalize text-low-white font-medium">{title}</p>
            {stringValue ? (
              <p className="text-xl font-bold">{stringValue}</p>
            ) : (
              <SlidingNumber
                transition={{ duration: 1000 }}
                className="text-3xl font-bold "
                number={numbers}
              />
            )}
          </div>
          <p className="text-xs capitalize">{describtion}</p>
        </div>
        <div className="w-10 h-10 bg-glass-green rounded-2xl flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
}
