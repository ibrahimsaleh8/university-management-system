"use client";

import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BookText, UserRound } from "lucide-react";
import { useParams } from "next/navigation";
import { PiStudent } from "react-icons/pi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export type TeacherClassDataType = {
  course: {
    id: number;
    name: string;
  };
  announcements: {
    id: number;
    title: string;
    content: string;
    created_at: Date;
    replies: number;
  }[];
  assignments: {
    id: number;
    title: string;
    description: string;
    deadline: Date;
    external_url: string | null;
    created_at: Date;
    submissions: number;
  }[];
  exams: {
    id: number;
    title: string;
    startDate: Date;
    endDate: Date;
    status: string;
  }[];
  students: number;
};

async function getTeacherClassInformation(
  name: string
): Promise<TeacherClassDataType> {
  const res = await axios.get(`${MainDomain}/api/get/class/${name}`);
  return res.data;
}
export default function ShowClassInfo() {
  const params = useParams();
  const className = params.name as string;

  const { data, error, isError } = useQuery({
    queryKey: ["teacher_class_info", className],
    queryFn: () => getTeacherClassInformation(className),
  });

  if (error && isError) throw new Error(error.message);

  console.log("data", data);
  return (
    <div className="flex flex-col gap-3">
      {/* Class Header */}
      <div className="w-full bg-Second-black flex flex-col items-center gap-3 rounded-md justify-center px-3 py-4">
        <p className="capitalize font-bold text-main-text">
          {className.split("%20").join(" ")}
        </p>

        <div className="flex items-center gap-4 text-sm mt-auto flex-wrap justify-center">
          <p className="flex items-center gap-1">
            <UserRound className="w-4 h-4" />
            <span className="font-[500]">Teacher</span>: Ibrahim
          </p>
          <p className="flex items-center gap-1">
            <BookText className="w-4 h-4" />
            <span className="font-[500]">Course</span>: Course-1
          </p>
          <p className="flex items-center gap-1">
            <PiStudent className="w-4 h-4" />
            <span className="font-[500]">Students</span>: 4
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="account" className="w-fit ">
        <TabsList className="bg-transparent px-2 rounded-sm gap-4">
          <TabsTrigger className="px-4 py-1 cursor-pointer" value="account">
            Announcements
          </TabsTrigger>
          <TabsTrigger className="px-4 py-1 cursor-pointer" value="password">
            Assignments
          </TabsTrigger>
          <TabsTrigger className="px-4 py-1 cursor-pointer" value="exams">
            Exams
          </TabsTrigger>
          <TabsTrigger className="px-4 py-1 cursor-pointer" value="students">
            Students
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
        <TabsContent value="exams">Change your password here.</TabsContent>
        <TabsContent value="students">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}
