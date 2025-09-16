"use client";
import { MotionHighlight } from "@/components/animate-ui/effects/motion-highlight";
import { useSidebar } from "@/components/ui/sidebar";
import {
  Home,
  MessageCircleMore,
  BookOpenText,
  ChartPie,
  LogOut,
  CalendarRange,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiGoogleclassroom } from "react-icons/si";
import { CgProfile } from "react-icons/cg";
import { useLogout } from "@/components/buttons/useLogout";

export default function StudentDashboadLinks({
  pathname,
}: {
  pathname: string;
}) {
  const { setOpenMobile } = useSidebar();
  const { HandleLogout } = useLogout();

  return (
    <MotionHighlight
      hover
      mode="parent"
      containerClassName="flex flex-col gap-3 "
      className="bg-main-text rounded-md !text-Main-black"
      boundsOffset={{ top: -1, left: -1 }}>
      <Link
        onClick={() => setOpenMobile(false)}
        href={"/dashboard/student"}
        className={`h-11 hover:text-black duration-200 font-medium flex items-center gap-3 px-10 pl-3 rounded-md ${
          pathname == "/dashboard/student" ? "bg-main-text text-black" : ""
        }`}>
        <Home className="w-5 h-5" />
        <span>Overview</span>
      </Link>
      <Link
        onClick={() => setOpenMobile(false)}
        href={"/dashboard/student/courses"}
        className={`h-11 hover:text-black duration-200 font-medium flex items-center gap-3 px-10 pl-3 rounded-md ${
          pathname == "/dashboard/student/courses"
            ? "bg-main-text text-black"
            : ""
        }`}>
        <BookOpenText className="w-5 h-5" />
        <span>Courses</span>
      </Link>

      <Link
        onClick={() => setOpenMobile(false)}
        href={"/dashboard/student/classes"}
        className={`h-11 hover:text-black duration-200 font-medium flex items-center gap-3 px-10 pl-3 rounded-md ${
          pathname.startsWith("/dashboard/student/classes")
            ? "bg-main-text text-black"
            : ""
        }`}>
        <SiGoogleclassroom className="w-5 h-5" />
        <span>Classes</span>
      </Link>
      <Link
        onClick={() => setOpenMobile(false)}
        href={"/dashboard/student/grades"}
        className={`h-11 hover:text-black duration-200 font-medium flex items-center gap-3 px-10 pl-3 rounded-md ${
          pathname.startsWith("/dashboard/student/grades")
            ? "bg-main-text text-black"
            : ""
        }`}>
        <ChartPie className="w-5 h-5" />
        <span>Courses Grades</span>
      </Link>
      <Link
        onClick={() => setOpenMobile(false)}
        href={"/dashboard/student/schedule"}
        className={`h-11 hover:text-black duration-200 font-medium flex items-center gap-3 px-10 pl-3 rounded-md ${
          pathname.startsWith("/dashboard/student/schedule")
            ? "bg-main-text text-black"
            : ""
        }`}>
        <CalendarRange className="w-5 h-5" />
        <span>Schedule</span>
      </Link>

      <Link
        onClick={() => setOpenMobile(false)}
        href={"/dashboard/student/messages"}
        className={`h-11 hover:text-black duration-200 font-medium flex items-center gap-3 px-10 pl-3 rounded-md ${
          pathname.startsWith("/dashboard/student/messages")
            ? "bg-main-text text-black"
            : ""
        }`}>
        <MessageCircleMore className="w-5 h-5" />
        <span>Messages</span>
      </Link>

      <Link
        onClick={() => setOpenMobile(false)}
        href={"/dashboard/student/profile"}
        className={`h-11 hover:text-black duration-200 font-medium flex items-center gap-3 px-10 pl-3 rounded-md ${
          pathname.startsWith("/dashboard/student/profile")
            ? "bg-main-text text-black"
            : ""
        }`}>
        <CgProfile className="w-5 h-5" />
        <span>Profile</span>
      </Link>

      <Button
        onClick={() => HandleLogout()}
        className={`h-11 hover:text-black duration-200 font-medium flex items-center justify-start gap-3 px-10 pl-3 rounded-md w-full bg-transparent hover:bg-transparent `}>
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </Button>
    </MotionHighlight>
  );
}
