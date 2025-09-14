"use client";
import { MotionHighlight } from "@/components/animate-ui/effects/motion-highlight";
import { useSidebar } from "@/components/ui/sidebar";
import {
  Users,
  Home,
  ChartBarStacked,
  CalendarRange,
  MessageCircleMore,
  Clock9,
  LogOut,
  BookOpenText,
} from "lucide-react";
import Link from "next/link";
import { FaChalkboardTeacher } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Button } from "@/components/ui/button";

export default function AdminDashboardLinks({
  pathname,
}: {
  pathname: string;
}) {
  const { setOpenMobile } = useSidebar();

  return (
    <MotionHighlight
      hover
      mode="parent"
      containerClassName="flex flex-col gap-2 "
      className="bg-main-text rounded-md !text-Main-black w-full"
      boundsOffset={{ top: -1, left: -1 }}>
      <Link
        onClick={() => setOpenMobile(false)}
        href={"/dashboard/admin"}
        className={`h-11 hover:text-black duration-200 font-medium flex items-center gap-3 px-10 pl-3 rounded-md ${
          pathname == "/dashboard/admin" ? "bg-main-text text-black" : ""
        }`}>
        <Home className="w-5 h-5" />
        <span>Overview</span>
      </Link>

      <Link
        onClick={() => setOpenMobile(false)}
        href={"/dashboard/admin/teachers"}
        className={`h-11 hover:text-black duration-200 font-medium flex items-center gap-3 px-10 pl-3 rounded-md ${
          pathname.startsWith("/dashboard/admin/teachers")
            ? "bg-main-text text-black"
            : ""
        }`}>
        <FaChalkboardTeacher className="w-5 h-5" />
        <span>Teachers</span>
      </Link>

      <Link
        onClick={() => setOpenMobile(false)}
        href={"/dashboard/admin/students"}
        className={`h-11 hover:text-black duration-200 font-medium flex items-center gap-3 px-10 pl-3 rounded-md ${
          pathname.startsWith("/dashboard/admin/students")
            ? "bg-main-text text-black"
            : ""
        }`}>
        <Users className="w-5 h-5" />
        <span>Students</span>
      </Link>

      <Link
        onClick={() => setOpenMobile(false)}
        href={"/dashboard/admin/courses"}
        className={`h-11 hover:text-black duration-200 font-medium flex items-center gap-3 px-10 pl-3 rounded-md ${
          pathname.startsWith("/dashboard/admin/courses")
            ? "bg-main-text text-black"
            : ""
        }`}>
        <BookOpenText className="w-5 h-5" />
        <span>Courses</span>
      </Link>

      <Link
        onClick={() => setOpenMobile(false)}
        href={"/dashboard/admin/departments"}
        className={`h-11 hover:text-black duration-200 font-medium flex items-center gap-3 px-10 pl-3 rounded-md ${
          pathname.startsWith("/dashboard/admin/departments")
            ? "bg-main-text text-black"
            : ""
        }`}>
        <ChartBarStacked className="w-5 h-5" />
        <span>Departments & Years</span>
      </Link>

      <Link
        onClick={() => setOpenMobile(false)}
        href={"/dashboard/admin/semesters"}
        className={`h-11 hover:text-black duration-200 font-medium flex items-center gap-3 px-10 pl-3 rounded-md ${
          pathname.startsWith("/dashboard/admin/semesters")
            ? "bg-main-text text-black"
            : ""
        }`}>
        <CalendarRange className="w-5 h-5" />
        <span>Semesters & Times</span>
      </Link>

      <Link
        onClick={() => setOpenMobile(false)}
        href={"/dashboard/admin/events"}
        className={`h-11 hover:text-black duration-200 font-medium flex items-center gap-3 px-10 pl-3 rounded-md ${
          pathname.startsWith("/dashboard/admin/events")
            ? "bg-main-text text-black"
            : ""
        }`}>
        <Clock9 className="w-5 h-5" />
        <span>Events</span>
      </Link>

      <Link
        onClick={() => setOpenMobile(false)}
        href={"/dashboard/admin/messages"}
        className={`h-11 hover:text-black duration-200 font-medium flex items-center gap-3 px-10 pl-3 rounded-md ${
          pathname.startsWith("/dashboard/admin/messages")
            ? "bg-main-text text-black"
            : ""
        }`}>
        <MessageCircleMore className="w-5 h-5" />
        <span>Messages</span>
      </Link>

      <Link
        onClick={() => setOpenMobile(false)}
        href={"/dashboard/admin/profile"}
        className={`h-11 hover:text-black duration-200 font-medium flex items-center gap-3 px-10 pl-3 rounded-md ${
          pathname.startsWith("/dashboard/admin/profile")
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
