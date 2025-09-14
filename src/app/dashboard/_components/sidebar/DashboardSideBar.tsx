"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import AdminDashboardLinks from "./AdminDashboardLinks";
import StudentDashboadLinks from "./StudentDashboadLinks";
import TeacherDashboardLinks from "./TeacherDashboardLinks";
import Image from "next/image";
import logoImage from "@images/logo.webp";
export default function DashboardSideBar({ role }: { role: string }) {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarContent className="pt-4 flex flex-col  bg-low-black border-r border-soft-border rounded-none">
        <div className="pl-4">
          <Image
            alt="Logo"
            src={logoImage}
            width={1000}
            height={1000}
            priority
            className="w-32"
          />
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Main Links</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-2">
              {role == "admin" ? (
                <AdminDashboardLinks pathname={pathname} />
              ) : role == "teacher" ? (
                <TeacherDashboardLinks pathname={pathname} />
              ) : (
                role == "student" && (
                  <StudentDashboadLinks pathname={pathname} />
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
