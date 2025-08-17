"use client";

import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BookText, ScrollText } from "lucide-react";
import { PiStudent } from "react-icons/pi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClassSkeleton from "./ClassSkeleton";
import TeacherClassAnnouncments from "./TeacherClassAnnouncments";
import ClassAssignments from "./ClassAssignments";
import ClassStudentsShow from "./ClassStudentsShow";
import { TfiAnnouncement } from "react-icons/tfi";
import { MdOutlineAssignment } from "react-icons/md";
import ShowClassExams from "./ShowClassExams";
import { GenderType } from "@/lib/globalTypes";
import Image from "next/image";
import BackButton from "@/app/dashboard/_components/forms/BackButton";

export type TeacherClassDataType = {
  course: {
    code: string;
    name: string;
  };
  name: string;
  teacher: {
    first_name: string;
    last_name: string;
    image: string;
    gender: GenderType;
    email: string;
  };
  classId: number;
};

async function getTeacherClassInformation(
  name: string
): Promise<TeacherClassDataType> {
  const res = await axios.get(`${MainDomain}/api/get/class/${name}`);
  return res.data;
}
export default function ShowClassInfo({
  token,
  className,
}: {
  token: string;
  className: string;
}) {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["teacher_class_info", className],
    queryFn: () => getTeacherClassInformation(className),
  });
  if (error && isError) throw new Error(error.message);

  return isLoading && !data ? (
    <ClassSkeleton />
  ) : (
    data && (
      <div className="flex flex-col gap-3 lg:w-[86%] w-full mx-auto">
        <BackButton withText={false} />
        {/* Header */}
        <div className="flex items-center gap-3 flex-col md:flex-row">
          <div className="bg-Second-black p-3 rounded-2xl md:w-fit flex flex-col items-center justify-center gap-2 text-center min-w-40 w-full h-28 border border-soft-border">
            <Image
              width={50}
              height={50}
              className="rounded-full"
              src={data.teacher.image}
              alt={`image-${data.teacher.first_name}`}
            />
            {/* Text */}
            <div className="flex flex-col gap-1 text-xs">
              <p className="font-medium capitalize">
                {data.teacher.gender == "MALE" ? "Mr/" : "Mrs/"}
                {` ${data.teacher.first_name} ${data.teacher.last_name}`}
              </p>
              <p className="text-low-white">{data.teacher.email}</p>
            </div>
          </div>

          <div className="w-full bg-Second-black flex flex-col items-center gap-3 rounded-2xl justify-center px-3 py-4 h-28 border border-soft-border">
            <p className="capitalize font-bold text-main-text text-xl">
              {data.name}
            </p>

            <div className="flex items-center gap-4 text-sm mt-auto flex-wrap justify-center">
              <p className="flex items-center gap-1">
                <BookText className="w-4 h-4" />
                <span className="font-[500]">Course</span>: {data.course.name} -{" "}
                {data.course.code}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="announcements" className="w-full">
          <TabsList className="bg-transparent px-2 rounded-sm gap-4 flex-wrap">
            <TabsTrigger
              className="px-4 py-1 cursor-pointer"
              value="announcements">
              <TfiAnnouncement className="w-4 h-4" />
              Announcements
            </TabsTrigger>
            <TabsTrigger
              className="px-4 py-1 cursor-pointer"
              value="assignments">
              <MdOutlineAssignment className="w-4 h-4" />
              Assignments
            </TabsTrigger>
            <TabsTrigger className="px-4 py-1 cursor-pointer" value="exams">
              <ScrollText className="w-4 h-4" />
              Exams
            </TabsTrigger>
            <TabsTrigger className="px-4 py-1 cursor-pointer" value="students">
              <PiStudent className="w-4 h-4" />
              Students
            </TabsTrigger>
          </TabsList>

          <TabsContent value="announcements">
            <TeacherClassAnnouncments
              className={className}
              classId={data.classId}
              token={token}
            />
          </TabsContent>
          <TabsContent value="assignments">
            <ClassAssignments
              className={className}
              token={token}
              classId={data.classId}
            />
          </TabsContent>
          <TabsContent value="exams">
            <ShowClassExams className={className} />
          </TabsContent>
          <TabsContent value="students">
            <ClassStudentsShow className={className} />
          </TabsContent>
        </Tabs>
      </div>
    )
  );
}
