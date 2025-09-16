"use client";

import { useAppSelector } from "@/redux/hooks";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroBtn() {
  const { isLoggedin, user } = useAppSelector((state) => state.user);
  return (
    <Link
      className="flex items-center gap-1 px-8 py-2 bg-main-text text-black rounded-sm font-bold text-sm"
      href={isLoggedin ? `/dashboard/${user.role}` : "/login"}>
      {isLoggedin ? "Dashboard" : "Login"}
      <ArrowRight className="w-4 h-4" />
    </Link>
  );
}
