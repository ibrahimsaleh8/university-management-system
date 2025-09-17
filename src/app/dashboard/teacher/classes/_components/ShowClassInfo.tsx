"use client";

import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { BookOpenText, Megaphone, ScrollText, Settings } from "lucide-react";
import { PiStudent } from "react-icons/pi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClassSkeleton from "./ClassSkeleton";
import TeacherClassAnnouncments from "./TeacherClassAnnouncments";
import ClassAssignments from "./ClassAssignments";
import ClassStudentsShow from "./ClassStudentsShow";
import { MdOutlineAssignment } from "react-icons/md";
import ShowClassExams from "./ShowClassExams";
import Image from "next/image";
import BackButton from "@/app/dashboard/_components/forms/BackButton";

export type TeacherClassDataType = {
  course: {
    code: string;
    name: string;
  };
  department: {
    name: string;
    code: string;
  };
  name: string;
  teacher: {
    first_name: string;
    last_name: string;
    image: string;
    email: string;
  };
  classId: number;
};

async function getTeacherClassInformation(
  name: string
): Promise<TeacherClassDataType> {
  try {
    const res = await axios.get(`${MainDomain}/api/get/class/${name}`);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
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
      <div className="flex flex-col gap-3 lg:w-[86%] w-full mx-auto relative">
        <BackButton withText={false} />
        {/* Header */}
        <div className="flex items-center gap-3 flex-col-reverse lg:flex-row">
          <div className="bg-main-dark p-4 rounded-md md:min-w-60 lg:w-fit flex flex-col items-center justify-center gap-2 text-center  w-full h-28 border border-soft-border">
            <Image
              width={1000}
              height={1000}
              className="rounded-full w-14 h-14 object-cover object-center"
              src={data.teacher.image}
              alt={`image-${data.teacher.first_name}`}
            />
            {/* Text */}
            <div className="flex flex-col gap-1 text-xs">
              <p className="font-medium capitalize">
                Dr.
                {` ${data.teacher.first_name} ${data.teacher.last_name}`}
              </p>
              <p className="text-low-white">{data.teacher.email}</p>
            </div>
          </div>

          <div className="w-full bg-main-dark flex flex-col items-center gap-3 rounded-md justify-center px-3 py-4 h-28 border border-soft-border">
            <p className="capitalize font-bold text-white text-xl">
              {`${data.name} ${
                !data.name.toLowerCase().endsWith("class") ? " class" : ""
              }`}
            </p>

            <div className="flex items-center gap-4 text-sm mt-auto flex-wrap justify-center">
              <p className="flex items-center gap-1 text-low-white capitalize">
                <BookOpenText className="w-4 h-4 text-main-text" />
                {data.course.name}
                <span className="uppercase">({data.course.code})</span>
              </p>
              <p className="flex items-center gap-1 text-low-white capitalize">
                <Settings className="w-4 h-4 text-main-text" />
                {data.department.name}
                <span className="uppercase">({data.department.code})</span>
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="announcements" className="w-full">
          <TabsList className="bg-transparent  rounded-sm gap-4 flex-wrap">
            <TabsTrigger
              className="px-4 py-1 cursor-pointer rounded-sm"
              value="announcements">
              <Megaphone className="w-4 h-4" />
              Announcements
            </TabsTrigger>
            <TabsTrigger
              className="px-4 py-1 cursor-pointer rounded-sm"
              value="assignments">
              <MdOutlineAssignment className="w-4 h-4" />
              Assignments
            </TabsTrigger>
            <TabsTrigger
              className="px-4 py-1 cursor-pointer rounded-sm"
              value="exams">
              <ScrollText className="w-4 h-4" />
              Exams
            </TabsTrigger>
            <TabsTrigger
              className="px-4 py-1 cursor-pointer rounded-sm"
              value="students">
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
            <ClassStudentsShow token={token} className={className} />
          </TabsContent>
        </Tabs>
      </div>
    )
  );
}
