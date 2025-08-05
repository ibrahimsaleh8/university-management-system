"use client";

import Link from "next/link";
import ClassExamCard from "./ClassExamCard";
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
export type ClassExamDataType = {
  id: string;
  title: string;
  status: "SCHEDULED" | "ONGOING" | "ENDED" | "CANCELLED";
  startDate: Date;
  endDate: Date;
  totalMark: number;
  duration: number;
  students: number;
};

async function getClassExams(className: string): Promise<ClassExamDataType[]> {
  const res = await axios.get(`${MainDomain}/api/get/class/${className}/exams`);
  return res.data;
}

// Query Key =>  class_exams
export default function ShowClassExams({ className }: { className: string }) {
  const {
    data: exams,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["class_exams", className],
    queryFn: () => getClassExams(className),
  });

  if (isError && error) throw new Error(error.message);

  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center gap-3 justify-between px-3">
        <p className="font-bold">Class Exams</p>
        <Link
          className="flex items-center gap-1 px-4 py-2 border border-main-text text-main-text hover:bg-main-text hover:text-black duration-300 font-medium rounded-md text-sm"
          href={`/dashboard/teacher/classes/${className}/add-exam`}>
          Add Exam
        </Link>
      </div>

      {isLoading && !exams ? (
        <div className="flex flex-col gap-3">
          <Skeleton className="w-full h-36" />
          <Skeleton className="w-full h-36" />
        </div>
      ) : exams && exams.length > 0 ? (
        <div className="flex flex-col gap-3">
          {exams.map((exam) => (
            <ClassExamCard {...exam} clasName={className} key={exam.id} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center text-low-white font-medium bg-Second-black w-full h-32 rounded-md">
          No Exams Found..
        </div>
      )}
      {/* Exam Card */}
    </div>
  );
}
