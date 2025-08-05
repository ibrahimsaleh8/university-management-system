"use client";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { role } = useAppSelector((state) => state.user.user);
  const route = useRouter();

  useEffect(() => {
    if (role == "admin") {
      route.replace("/dashboard/admin");
    }
    if (role == "teacher") {
      route.replace("/dashboard/teacher");
    }
    if (role == "student") {
      route.replace("/dashboard/student");
    }
  }, [role, route]);
  return <></>;
}
