"use client";

import { useAppSelector } from "@/redux/hooks";

export default function Home() {
  const { user, isLoggedin } = useAppSelector((state) => state.user);
  console.log(user);
  console.log(isLoggedin);
  return (
    <div className="flex items-center justify-center p-3 text-3xl">
      <h1>School Managment System</h1>
    </div>
  );
}
