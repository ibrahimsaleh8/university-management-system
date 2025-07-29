"use client";
import {
  Users,
  Home,
  ChartBarStacked,
  Settings,
  LogOut,
  CalendarRange,
  BookOpenText,
  BookText,
  MessageCircleMore,
  Clock9,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChalkboardTeacher } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MotionHighlight } from "@/components/animate-ui/effects/motion-highlight";
import { SiGoogleclassroom } from "react-icons/si";

const admin_links = [
  {
    title: "Overview",
    url: "/dashboard/admin",
    icon: Home,
  },
  {
    title: "Teachers",
    url: "/dashboard/admin/teachers",
    icon: FaChalkboardTeacher,
  },
  {
    title: "Students",
    url: "/dashboard/admin/students",
    icon: Users,
  },
  {
    title: "Courses",
    url: "/dashboard/admin/courses",
    icon: BookText,
  },
  {
    title: "Departments & Years",
    url: "/dashboard/admin/departments",
    icon: ChartBarStacked,
  },
  {
    title: "Semesters & Times",
    url: "/dashboard/admin/semesters",
    icon: CalendarRange,
  },
  {
    title: "Events",
    url: "/dashboard/admin/events",
    icon: Clock9,
  },
  {
    title: "Messages",
    url: "/dashboard/admin/messages",
    icon: MessageCircleMore,
  },
];

const otherLinks = [
  {
    title: "Profile",
    url: "/",
    icon: CgProfile,
  },
  {
    title: "Settings",
    url: "/",
    icon: Settings,
  },
  {
    title: "Logout",
    url: "/",
    icon: LogOut,
  },
];
export default function DashboardSideBar({ role }: { role: string }) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  return (
    <Sidebar>
      <SidebarContent className="pt-4 bg-low-black border border-soft-border m-1 rounded-lg">
        <p className="px-4 font-bold text-center">School-Managment</p>

        <SidebarGroup>
          <SidebarGroupLabel>Main Links</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-2">
              <>
                {role == "admin" ? (
                  <MotionHighlight
                    hover
                    mode="parent"
                    containerClassName="flex flex-col gap-1 "
                    className="bg-main-text rounded-md !text-Main-black"
                    boundsOffset={{ top: -1, left: -1 }}>
                    {admin_links.map((item) => (
                      <Link
                        onClick={() => setOpenMobile(false)}
                        key={item.title}
                        href={item.url}
                        className={`h-11 hover:text-black duration-200 font-medium flex items-center gap-3 px-10 pl-3 rounded-md ${
                          pathname == item.url ? "bg-main-text text-black" : ""
                        }`}>
                        <item.icon className="w-5 h-5" />
                        <span className="!text-[.855rem]">{item.title}</span>
                      </Link>
                    ))}
                  </MotionHighlight>
                ) : role == "teacher" ? (
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
                        pathname == "/dashboard/teacher"
                          ? "bg-main-text text-black"
                          : ""
                      }`}>
                      <Home className="w-5 h-5" />
                      <span>Overview</span>
                    </Link>
                    <Link
                      onClick={() => setOpenMobile(false)}
                      href={"/dashboard/teacher/courses"}
                      className={`h-11 hover:text-black duration-200 font-medium flex items-center gap-3 px-10 pl-3 rounded-md ${
                        pathname == "/dashboard/teacher/courses"
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
                      href={"/dashboard/teacher/messages"}
                      className={`h-11 hover:text-black duration-200 font-medium flex items-center gap-3 px-10 pl-3 rounded-md ${
                        pathname.startsWith("/dashboard/teacher/messages")
                          ? "bg-main-text text-black"
                          : ""
                      }`}>
                      <MessageCircleMore className="w-5 h-5" />
                      <span>Messages</span>
                    </Link>
                  </MotionHighlight>
                ) : (
                  role == "student" && (
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
                          pathname == "/dashboard/student"
                            ? "bg-main-text text-black"
                            : ""
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
                        href={"/dashboard/student/messages"}
                        className={`h-11 hover:text-black duration-200 font-medium flex items-center gap-3 px-10 pl-3 rounded-md ${
                          pathname.startsWith("/dashboard/student/messages")
                            ? "bg-main-text text-black"
                            : ""
                        }`}>
                        <MessageCircleMore className="w-5 h-5" />
                        <span>Messages</span>
                      </Link>
                    </MotionHighlight>
                  )
                )}
              </>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Other Links */}

        <SidebarGroup>
          <SidebarGroupLabel>Other Links</SidebarGroupLabel>
          <SidebarGroupContent>
            <MotionHighlight
              hover
              mode="parent"
              containerClassName="flex flex-col gap-1"
              className="bg-main-text rounded-md !text-Main-black"
              boundsOffset={{ top: -1, left: -1 }}>
              {otherLinks.map((item) => (
                <Link
                  key={item.title}
                  href={item.url}
                  className={`h-11 hover:text-black duration-200 font-medium flex items-center gap-3 px-10 pl-3 rounded-md ${
                    pathname == item.url ? "bg-main-text text-black" : ""
                  }`}>
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </Link>
              ))}
            </MotionHighlight>{" "}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
