"use client";
import { MotionHighlight } from "@/components/animate-ui/effects/motion-highlight";
import { useSidebar } from "@/components/ui/sidebar";
import {
  Home,
  MessageCircleMore,
  BookOpenText,
  LogOut,
  CalendarRange,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiGoogleclassroom } from "react-icons/si";
import { CgProfile } from "react-icons/cg";

export default function TeacherDashboardLinks({
  pathname,
}: {
  pathname: string;
}) {
  const { setOpenMobile } = useSidebar();

  return (
    <MotionHighlight
      hover
      mode="parent"
      containerClassName="flex flex-col gap-3 "
      className="bg-main-text rounded-md !text-Main-black"
      boundsOffset={{ top: -1, left: -1 }}>
      <Link
        onClick={() => setOpenMobile(false)}
        href={"/dashboard/teacher"}
        className={`h-11 hover:text-black duration-200 font-medium flex items-center gap-3 px-10 pl-3 rounded-md ${
          pathname == "/dashboard/teacher" ? "bg-main-text text-black" : ""
        }`}>
        <Home className="w-5 h-5" />
        <span>Overview</span>
      </Link>
      <Link
        onClick={() => setOpenMobile(false)}
        href={"/dashboard/teacher/courses"}
        className={`h-11 hover:text-black duration-200 font-medium flex items-center gap-3 px-10 pl-3 rounded-md ${
          pathname.startsWith("/dashboard/teacher/courses")
            ? "bg-main-text text-black"
            : ""
        }`}>
        <BookOpenText className="w-5 h-5" />
        <span>Courses</span>
      </Link>
      <Link
        onClick={() => setOpenMobile(false)}
        href={"/dashboard/teacher/classes"}
        className={`h-11 hover:text-black duration-200 font-medium flex items-center gap-3 px-10 pl-3 rounded-md ${
          pathname.startsWith("/dashboard/teacher/classes")
            ? "bg-main-text text-black"
            : ""
        }`}>
        <SiGoogleclassroom className="w-5 h-5" />
        <span>Classes</span>
      </Link>

      <Link
        onClick={() => setOpenMobile(false)}
        href={"/dashboard/teacher/schedule"}
        className={`h-11 hover:text-black duration-200 font-medium flex items-center gap-3 px-10 pl-3 rounded-md ${
          pathname.startsWith("/dashboard/teacher/schedule")
            ? "bg-main-text text-black"
            : ""
        }`}>
        <CalendarRange className="w-5 h-5" />
        <span>Schedule</span>
      </Link>

      <Link
        onClick={() => setOpenMobile(false)}
        href={"/dashboard/teacher/messages"}
        className={`h-11 hover:text-black duration-200 font-medium flex items-center gap-3 px-10 pl-3 rounded-md ${
          pathname.startsWith("/dashboard/teacher/messages")
            ? "bg-main-text text-black"
            : ""
        }`}>
        <MessageCircleMore className="w-5 h-5" />
        <span>Messages</span>
      </Link>

      <Link
        onClick={() => setOpenMobile(false)}
        href={"/dashboard/teacher/profile"}
        className={`h-11 hover:text-black duration-200 font-medium flex items-center gap-3 px-10 pl-3 rounded-md ${
          pathname.startsWith("/dashboard/teacher/profile")
            ? "bg-main-text text-black"
            : ""
        }`}>
        <CgProfile className="w-5 h-5" />
        <span>Profile</span>
      </Link>

      <Button
        onClick={() => setOpenMobile(false)}
        className={`h-11 hover:text-black duration-200 font-medium flex items-start justify-start gap-3 px-10 pl-3 rounded-md w-full bg-transparent hover:bg-transparent `}>
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </Button>
    </MotionHighlight>
  );
}
