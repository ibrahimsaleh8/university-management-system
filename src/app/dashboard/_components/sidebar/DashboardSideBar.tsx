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

export default function DashboardSideBar({ role }: { role: string }) {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarContent className="pt-4 bg-low-black border border-soft-border m-1 rounded-lg">
        <p className="px-4 font-bold text-center">School-Managment</p>

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
