"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAppSelector } from "@/redux/hooks";
import student_profile from "@images/student_profile.jpeg";
import user_profile from "@images/user_profile.jpeg";
import Image from "next/image";
export default function DashboardHeader() {
  const { first_name, last_name, role } = useAppSelector(
    (state) => state.user.user
  );
  return (
    <header className="py-2 px-3 flex items-center justify-between border-b border-soft-border">
      <SidebarTrigger />

      <div className="flex gap-3">
        <div>
          <p className="font-medium text-sm">{`${first_name} ${last_name}`}</p>
          <p className="text-sm text-low-white capitalize">
            {role.toLowerCase()}
          </p>
        </div>
        <Image
          className="w-10 h-10 object-cover object-top rounded-full"
          src={role == "STUDENT" ? student_profile : user_profile}
          alt="User Logo"
        />
      </div>
    </header>
  );
}
