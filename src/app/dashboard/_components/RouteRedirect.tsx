import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function RouteRedirect() {
  const { role } = useAppSelector((state) => state.user.user);
  const route = useRouter();

  useEffect(() => {
    if (role == "ADMIN") {
      route.replace("/dashboard/admin");
    }
    if (role == "TEACHER") {
      route.replace("/dashboard/teacher");
    }
    if (role == "STUDENT") {
      route.replace("/dashboard/student");
    }
  }, [role, route]);
  return <div>RouteRedirect</div>;
}
