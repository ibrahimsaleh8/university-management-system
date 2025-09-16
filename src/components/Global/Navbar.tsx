"use client";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import LogoutBtn from "../buttons/LogoutBtn";
import Image from "next/image";
import logoImage from "@images/logo.webp";
export default function Navbar() {
  const { isLoggedin, user } = useAppSelector((state) => state.user);
  return (
    <header className="flex gap-3 items-center w-full py-4 px-6">
      <Link href={"/"}>
        <Image
          src={logoImage}
          alt="Logo"
          width={1000}
          height={1000}
          className="w-28"
        />
      </Link>
      <ul className="flex-1 flex items-center justify-end gap-3">
        {isLoggedin && user.role ? (
          <>
            <li>
              <LogoutBtn />
            </li>
            <li>
              <Link
                className="bg-white hover:opacity-85 duration-300 px-4 py-1.5 flex items-center justify-center text-black text-sm rounded-sm"
                href={`/dashboard/${user.role.toLowerCase()}`}>
                Dashboard
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="flex items-center gap-4">
              <Link
                className="bg-white hover:opacity-85 duration-300 text-black px-4 font-medium text-sm py-1.5 rounded-sm"
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
