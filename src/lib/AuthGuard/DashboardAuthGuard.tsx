"use client";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export const DashboardAuthGuard = ({
  children,
  userRole,
}: {
  userRole: string | null;
  children: ReactNode;
}) => {
  const currentPathname = usePathname();
  const route = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!userRole) {
      route.replace("/");
      return;
    }

    if (
      userRole == "admin" &&
      (currentPathname.includes("/dashboard/teacher") ||
        currentPathname.includes("/dashboard/student"))
    ) {
      route.replace("/dashboard/admin");
      return;
    }
    if (
      userRole == "student" &&
      (currentPathname.includes("/dashboard/teacher") ||
        currentPathname.includes("/dashboard/admin"))
    ) {
      route.replace("/dashboard/student");
      return;
    }
    if (
      userRole == "teacher" &&
      (currentPathname.includes("/dashboard/student") ||
        currentPathname.includes("/dashboard/admin"))
    ) {
      route.replace("/dashboard/teacher");
      return;
    }
    setIsChecking(false);
  }, [currentPathname, route, userRole]);
  if (!userRole || isChecking) return null;

  return <div>{children}</div>;
};
