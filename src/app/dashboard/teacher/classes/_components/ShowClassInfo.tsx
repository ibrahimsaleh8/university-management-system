"use client";

import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BookText, ScrollText, UserRound } from "lucide-react";
import { useParams } from "next/navigation";
import { PiStudent } from "react-icons/pi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClassSkeleton from "./ClassSkeleton";
import TeacherClassAnnouncments from "./TeacherClassAnnouncments";
import ClassAssignments from "./ClassAssignments";
import ClassStudentsShow from "./ClassStudentsShow";
import { TfiAnnouncement } from "react-icons/tfi";
import { MdOutlineAssignment } from "react-icons/md";
import ShowClassExams from "./ShowClassExams";

export type TeacherClassDataType = {
  course: {
    id: number;
    name: string;
  };
  exams: {
    id: number;
    title: string;
    startDate: Date;
    endDate: Date;
    status: string;
  }[];
  students: number;
  name: string;
  teacher: string;
  classId: number;
};

async function getTeacherClassInformation(
  name: string
): Promise<TeacherClassDataType> {
  const res = await axios.get(`${MainDomain}/api/get/class/${name}`);
  return res.data;
}
export default function ShowClassInfo({ token }: { token: string }) {
  const params = useParams();
  const className = params.name as string;

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["teacher_class_info", className],
    queryFn: () => getTeacherClassInformation(className),
  });
  if (error && isError) throw new Error(error.message);

  return (
    <div className="flex flex-col gap-3">
      {isLoading && !data ? (
        <ClassSkeleton />
      ) : (
        data && (
          <div className="card-black-shadow w-full bg-Second-black flex flex-col items-center gap-3 rounded-md justify-center px-3 py-4">
            <p className="capitalize font-bold text-main-text">{data.name}</p>

            <div className="flex items-center gap-4 text-sm mt-auto flex-wrap justify-center">
              <p className="flex items-center gap-1">
                <UserRound className="w-4 h-4" />
                <span className="font-[500]">Teacher</span>: {data.teacher}
              </p>
              <p className="flex items-center gap-1">
                <BookText className="w-4 h-4" />
                <span className="font-[500]">Course</span>: {data.course.name}
              </p>
              <p className="flex items-center gap-1">
                <PiStudent className="w-4 h-4" />
                <span className="font-[500]">Students</span>: {data.students}
              </p>
            </div>
          </div>
        )
      )}

      {/* Tabs */}
      <Tabs defaultValue="announcements" className="w-full">
        <TabsList className="bg-transparent px-2 rounded-sm gap-4 flex-wrap">
          <TabsTrigger
            className="px-4 py-1 cursor-pointer"
            value="announcements">
            <TfiAnnouncement className="w-4 h-4" />
            Announcements
          </TabsTrigger>
          <TabsTrigger className="px-4 py-1 cursor-pointer" value="assignments">
            <MdOutlineAssignment className="w-4 h-4" />
            Assignments
          </TabsTrigger>

          <TabsTrigger className="px-4 py-1 cursor-pointer" value="students">
            <PiStudent className="w-4 h-4" />
            Students
          </TabsTrigger>
          <TabsTrigger className="px-4 py-1 cursor-pointer" value="exams">
            <ScrollText className="w-4 h-4" />
            Exams
          </TabsTrigger>
        </TabsList>

        <TabsContent value="announcements">
          <TeacherClassAnnouncments
            className={className}
            classId={data ? data.classId : 0}
            token={token}
          />
        </TabsContent>
        <TabsContent value="assignments">
          <ClassAssignments
            className={className}
            token={token}
            classId={data ? data.classId : 0}
          />
        </TabsContent>

        <TabsContent value="students">
          <ClassStudentsShow className={className} />
        </TabsContent>
        <TabsContent value="exams">
          <ShowClassExams className={className} />
        </TabsContent>
      </Tabs>

      {/* Add Exam */}
    </div>
  );
}
