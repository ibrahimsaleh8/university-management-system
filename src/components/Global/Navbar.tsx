"use client";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import LogoutBtn from "../buttons/LogoutBtn";

export default function Navbar() {
  const { isLoggedin, user } = useAppSelector((state) => state.user);
  return (
    <header className="flex gap-3 items-center w-full py-4 px-6 bg-Main-black">
      <Link href={"/"}>Logo</Link>
      <ul className="flex-1 flex items-center justify-end gap-3">
        {isLoggedin && user.role ? (
          <>
            <li>
              <LogoutBtn />
            </li>
            <li>
              <Link
                className="bg-white h-9 flex items-center justify-center text-black px-3 py-1 rounded-sm"
                href={`/dashboard/${user.role.toLowerCase()}`}>
                Dashboard
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="flex items-center gap-4">
              <Link
                className="bg-white text-black px-3 py-1 rounded-sm"
                href={"/login"}>
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}
