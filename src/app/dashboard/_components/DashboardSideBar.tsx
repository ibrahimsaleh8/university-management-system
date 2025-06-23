"use client";
import {
  Users,
  Home,
  School,
  ChartBarStacked,
  Newspaper,
  NotepadText,
  Settings,
  LogOut,
  CalendarRange,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChalkboardTeacher } from "react-icons/fa";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { useAppSelector } from "@/redux/hooks";
import { MotionHighlight } from "@/components/animate-ui/effects/motion-highlight";

const admin_links = [
  {
    title: "Home",
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
    title: "Classes",
    url: "/dashboard/admin/classes",
    icon: School,
  },
  {
    title: "Departments",
    url: "/dashboard/admin/departments",
    icon: ChartBarStacked,
  },
  {
    title: "Semesters",
    url: "/dashboard/admin/semesters",
    icon: CalendarRange,
  },
  {
    title: "Exams",
    url: "#",
    icon: Newspaper,
  },
  {
    title: "Assignments",
    url: "#",
    icon: NotepadText,
  },
  {
    title: "Announcements",
    url: "#",
    icon: HiOutlineSpeakerphone,
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
export default function DashboardSideBar() {
  const pathname = usePathname();
  const { role } = useAppSelector((state) => state.user.user);
  return (
    <>
      <Sidebar>
        <SidebarContent className="pt-4 bg-Second-black">
          <p className="px-4 font-bold text-center">School-Managment</p>

          <SidebarGroup>
            <SidebarGroupLabel>MENU</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-3 mt-4">
                <>
                  {role == "admin" ? (
                    <MotionHighlight
                      hover
                      mode="parent"
                      containerClassName="flex flex-col gap-3 "
                      className="bg-main-text rounded-md !text-Main-black"
                      boundsOffset={{ top: -1, left: -1 }}>
                      {admin_links.map((item) => (
                        <Link
                          key={item.title}
                          href={item.url}
                          className={`h-11 hover:text-black duration-200 font-medium flex items-center gap-3 px-10 pl-3 rounded-md ${
                            pathname == item.url
                              ? "bg-main-text text-black"
                              : ""
                          }`}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      ))}
                    </MotionHighlight>
                  ) : (
                    <></>
                  )}
                </>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Other Links */}

          <SidebarGroup>
            <SidebarGroupLabel>MENU</SidebarGroupLabel>
            <SidebarGroupContent>
              <MotionHighlight
                hover
                mode="parent"
                containerClassName="flex flex-col gap-3 "
                className="bg-main-text rounded-md !text-Main-black"
                boundsOffset={{ top: -1, left: -1 }}>
                {otherLinks.map((item) => (
                  <Link
                    key={item.title}
                    href={item.url}
                    className={`h-11 hover:text-black duration-200 font-medium flex items-center gap-3 px-10 pl-3 rounded-md ${
                      pathname == item.url ? "bg-main-text text-black" : ""
                    }`}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                ))}
              </MotionHighlight>{" "}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
