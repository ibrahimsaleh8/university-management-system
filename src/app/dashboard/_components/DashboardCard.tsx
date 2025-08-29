import { SlidingNumber } from "@/components/animate-ui/text/sliding-number";
import { LayoutDashboard } from "lucide-react";

export default function DashboardCard() {
  return (
    <div className="w-full min-h-36 bg-Second-black text-white rounded-2xl flex flex-col gap-4 py-4 px-6 relative">
      {/* Text */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-4 pb-4">
          <div className="flex flex-col gap-2">
            <p className="capitalize text-low-white">admins</p>
            <SlidingNumber
              transition={{ duration: 1000 }}
              className="text-3xl font-bold "
              number={2}
            />
          </div>
          <p className="text-xs">Total Number of admins</p>
        </div>
        <div className="w-10 h-10 bg-glass-green rounded-2xl flex items-center justify-center">
          <LayoutDashboard className="w-5 h-5 text-main-text" />
        </div>
      </div>
    </div>
  );
}
