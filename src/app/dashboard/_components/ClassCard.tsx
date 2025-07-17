"use client";
import { ChevronsRight } from "lucide-react";
import Link from "next/link";
import { GoGear } from "react-icons/go";
import { PiStudent } from "react-icons/pi";
import { TfiAnnouncement } from "react-icons/tfi";
export type ClassTeacherData = {
  id: number;
  name: string;
  department: string;
  students: number;
  announcements: number;
};
export default function ClassCard({
  announcements,
  department,
  name,
  students,
}: ClassTeacherData) {
  return (
    <div className="w-full border rounded-md overflow-hidden border-soft-border flex flex-col gap-2">
      {/* Name */}
      <div className="sm:w-1/2 w-3/4 bg-Second-black py-2 px-3 clip-path-div">
        <p className="font-bold capitalize">{name}</p>
      </div>

      {/* Info */}
      <div className="mt-auto flex-col md:flex-row text-sm flex items-center justify-between gap-5 px-3 py-3">
        <div className="flex items-center gap-5 flex-wrap">
          <p className="flex items-center gap-1 capitalize">
            <GoGear className="w-4 h-4 text-sky-400" />
            <span className="font-bold">Department: </span>
            {department}
          </p>
          <p className="flex items-center gap-1 capitalize">
            <PiStudent className="w-4 h-4 text-rose-500" />
            <span className="font-bold">Students: </span>
            {students}
          </p>
          <p className="flex items-center gap-1 capitalize">
            <TfiAnnouncement className="w-4 h-4 text-main-text" />
            <span className="font-bold">Announcements: </span>
            {announcements}
          </p>
        </div>

        <Link
          href={`/dashboard/teacher/classes/${name}`}
          className="px-5 hover:pr-3 duration-300 w-full md:w-[15rem] lg:w-fit  text-sm py-1 flex items-center gap-2 ml-auto border border-main-text text-black bg-main-text font-medium rounded-sm">
          Go to Class
          <ChevronsRight className="ml-auto" />
        </Link>
      </div>
    </div>
  );
}
