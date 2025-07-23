"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAppSelector } from "@/redux/hooks";
import student_profile from "@images/student_profile.jpeg";
import user_profile from "@images/user_profile.jpeg";
import { MessageCircleMore, Settings } from "lucide-react";
import Image from "next/image";
export default function DashboardHeader() {
  const { first_name, last_name, role } = useAppSelector(
    (state) => state.user.user
  );
  return (
    <header className="py-2 border border-soft-border px-3 flex items-center justify-between bg-low-black rounded-md">
      <SidebarTrigger />
      {/* Items */}
      <div className="flex items-center gap-4">
        <div className="bg-Second-black relative rounded-sm p-1 w-10 h-10 flex items-center justify-center">
          <Settings className="w-5 h-5" />
        </div>
        <div className="bg-Second-black relative rounded-sm p-1 w-10 h-10 flex items-center justify-center">
          <div className="w-4 h-4 p-1 bg-red-500 font-bold absolute right-[-7px] top-[-3px] rounded-full flex items-center justify-center text-[9px] text-white ">
            1
          </div>
          <MessageCircleMore className="w-5 h-5" />
        </div>

        <div className="flex gap-3 h-10 overflow-hidden bg-Second-black px-4 py-1 rounded-md pl-2 ">
          <Image
            className="w-8 h-8 object-cover object-top rounded-full"
            src={role == "STUDENT" ? student_profile : user_profile}
            alt="User Logo"
          />
          <div className="flex flex-col gap-0">
            <p className="font-medium text-xs">{`${first_name} ${last_name}`}</p>
            <p className="text-low-white capitalize text-xs mt-auto">
              {role.toLowerCase()}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
