import { SlidingNumber } from "@/components/animate-ui/text/sliding-number";
import { LayoutDashboard } from "lucide-react";

export default function DashboardCard() {
  return (
    <div className="w-full h-36  bg-Second-black text-white rounded-md flex flex-col gap-4  py-4 px-4 ">
      {/* Header */}
      <div className="w-full flex items-center gap-2 justify-between">
        <p className="text-[0.7rem] p-1 px-3 bg-white font-medium text-black rounded-sm">
          2025/26
        </p>
        <LayoutDashboard className="w-5 h-5 text-main-text" />
      </div>
      {/* Text */}
      <div className="flex flex-col gap-1 pb-4">
        <SlidingNumber
          transition={{ duration: 1000 }}
          className="text-3xl font-bold "
          number={2}
        />
        <p className="text-sm ">admins</p>
      </div>
    </div>
  );
}
