"use client";
import { formatDeadline } from "@/lib/FormatDeadline";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GoGear } from "react-icons/go";
import { PiStudent } from "react-icons/pi";
export type ClassTeacherData = {
  id: number;
  name: string;
  department: string;
  students: number;
  wide_image: string;
  created_at: Date;
};
export default function ClassCard({
  department,
  name,
  students,
  wide_image,
  created_at,
}: ClassTeacherData) {
  return (
    <div className="max-w-[26rem] border rounded-md hover:border-[#b9f82169] duration-300 overflow-hidden border-soft-border flex flex-col">
      <Image
        className="w-full h-80 object-cover object-center"
        src={wide_image}
        alt={name}
        width={400}
        height={100}
      />

      {/* Info */}
      <div className="text-sm flex flex-col gap-5 p-3 bg-Second-black border-t border-soft-border">
        <p className="font-bold capitalize text-lg">{name}</p>

        <div className="flex flex-col items-start gap-3 text-low-white">
          <p className="flex items-center gap-1 capitalize">
            <GoGear className="w-4 h-4" />
            <span className="font-bold">Department: </span>
            {department}
          </p>
          <p className="flex items-center gap-1 capitalize">
            <PiStudent className="w-4 h-4" />
            <span className="font-bold">Students: </span>
            {students}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap justify-between">
          <p className="text-xs text-low-white">
            Created: {formatDeadline(created_at)}
          </p>
          <Link
            href={`/dashboard/teacher/classes/${name}`}
            className="px-3 duration-300 w-fit text-sm py-1 flex items-center gap-2 border border-main-text text-black bg-main-text font-medium rounded-sm hover:bg-transparent hover:text-main-text">
            Go to Class
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
