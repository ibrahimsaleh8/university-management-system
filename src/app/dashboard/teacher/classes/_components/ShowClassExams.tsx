"use client";

import Link from "next/link";
import ClassExamCard from "./ClassExamCard";
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import LoadingTab from "@/app/dashboard/student/classes/[name]/_components/LoadingTab";
export type ClassExamDataType = {
  id: string;
  title: string;
  status: "SCHEDULED" | "ONGOING" | "ENDED" | "CANCELLED";
  startDate: Date;
  endDate: Date;
  totalMark: number;
  duration: number;
  autoMark: boolean;
};

async function getClassExams(className: string): Promise<ClassExamDataType[]> {
  const res = await axios.get(`${MainDomain}/api/get/class/${className}/exams`);
  return res.data;
}

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
      <div className="flex items-center gap-3 justify-end px-3">
        <Link
          className="flex items-center gap-1 px-4 py-2 border border-main-text text-main-text hover:bg-main-text hover:text-black duration-300 font-medium rounded-md text-sm"
          href={`/dashboard/teacher/classes/${className}/add-exam`}>
          <Plus className="w-4 h-4" />
          Add Exam
        </Link>
      </div>

      {isLoading && !exams ? (
        <LoadingTab />
      ) : exams && exams.length > 0 ? (
        <div className="flex flex-col gap-5">
          {exams.map((exam) => (
            <ClassExamCard {...exam} clasName={className} key={exam.id} />
          ))}
        </div>
      ) : (
        <div className="w-full h-36 border border-soft-border bg-main-dark flex items-center justify-center text-white rounded-md">
          No Exams Found..
        </div>
      )}
      {/* Exam Card */}
    </div>
  );
}
