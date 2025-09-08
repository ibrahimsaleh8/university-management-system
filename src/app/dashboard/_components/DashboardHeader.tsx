"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAppSelector } from "@/redux/hooks";
import { MessageCircleMore, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function DashboardHeader() {
  const { first_name, last_name, role, image } = useAppSelector(
    (state) => state.user.user
  );
  return (
    <header className="py-2 sm:border border-soft-border px-3 flex items-center justify-between bg-low-black sm:rounded-md">
      <SidebarTrigger />
      {/* Items */}
      <div className="flex items-center gap-4">
        <div className="bg-Second-black relative rounded-sm p-1 w-10 h-10 flex items-center justify-center">
          <Settings className="w-5 h-5" />
        </div>
        <Link
          href={`/dashboard/${role}/messages`}
          className="bg-Second-black relative rounded-sm p-1 w-10 h-10 flex items-center justify-center">
          <MessageCircleMore className="w-5 h-5" />
        </Link>

        <div className="flex gap-3 h-10 overflow-hidden bg-Second-black px-4 py-1 rounded-md pl-2 ">
          {image ? (
            <Image
              className="w-8 h-8 object-cover object-center rounded-full"
              src={image}
              alt="User Logo"
              width={1000}
              height={1000}
              priority={true}
            />
          ) : (
            <div className="w-8 h-8 bg-Second-Card-bg rounded-full"></div>
          )}

          <div className="flex flex-col gap-0">
            {first_name ? (
              <p className="font-medium text-xs">{`${first_name} ${last_name}`}</p>
            ) : (
              <div className="w-20 flex flex-col gap-0">
                <div className="bg-Second-Card-bg w-full h-2 "></div>
              </div>
            )}
            {role ? (
              <p className="text-low-white capitalize text-xs mt-auto">
                {role.toLowerCase()}
              </p>
            ) : (
              <div className="w-10 mt-3 bg-Second-Card-bg h-2"></div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
