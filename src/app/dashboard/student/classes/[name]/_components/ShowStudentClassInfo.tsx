"use client";

import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BookOpenText, Megaphone, ScrollText, Settings } from "lucide-react";
import SmallClassInfo from "./SmallClassInfo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MdOutlineAssignment } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import SkeletonLoadingMainData from "./SkeletonLoadingMainData";
import ShowStudentAnnouncments from "./ShowStudentAnnouncments";
import ShowStudentAssignments from "./ShowStudentAssignments";
import ShowStudentsExam from "./ShowStudentsExam";
import Image from "next/image";
import { GenderType } from "@/lib/globalTypes";
import ShowClassStudents from "./ShowClassStudents";
type Props = {
  token: string;
  name: string;
};

export type StudentClassDetailResponse = {
  id: string;
  name: string;
  teacher: {
    first_name: string;
    last_name: string;
    gender: GenderType;
    email: string;
    image: string;
  };
  course: {
    name: string;
    code: string;
  };
  department: {
    name: string;
    code: string;
  };
  count: {
    announcements: number;
    assignments: number;
    exams: number;
    students: number;
  };
};

async function getClassInfoApi(
  token: string,
  className: string
): Promise<StudentClassDetailResponse> {
  const res = await axios.get(
    `${MainDomain}/api/get/student-registerd-classes/${className}/get-main-data`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}
export default function ShowStudentClassInfo({ name, token }: Props) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["student_class_info", name],
    queryFn: () => getClassInfoApi(token, name),
  });
  if (error && isError) throw new Error(error.message);
  return isLoading ? (
    <SkeletonLoadingMainData />
  ) : (
    data && (
      <div className="flex flex-col gap-2">
        {/* Top */}
        <div className="flex items-center gap-2 md:flex-row flex-col">
          {/* Teacher Data */}
          <div className="flex flex-col justify-center items-center text-center gap-2 border border-soft-border bg-Second-black rounded-2xl md:w-fit overflow-hidden w-full md:min-w-52 py-2 px-3">
            <Image
              src={data.teacher.image}
              alt="teacher-image"
              className="object-cover object-center rounded-full"
              width={44}
              height={44}
            />
            <div className="flex flex-col gap-0.5 text-low-white text-sm">
              <p>
                {data.teacher.gender == "MALE" ? "Mr/" : "Mrs/"}
                {`${data.teacher.first_name} ${data.teacher.last_name}`}
              </p>
              <p>{data.teacher.email}</p>
            </div>
          </div>

          {/* Header */}
          <div className="w-full bg-Second-black rounded-2xl p-3 flex flex-col gap-10 border border-soft-border">
            {/* text */}
            <div className="flex items-center justify-center">
              <p className="font-bold text-xl capitalize">{data.name}</p>
            </div>

            {/* Info */}
            {/* Small Info */}
            <div className="flex items-center gap-6 flex-wrap justify-center mt-auto">
              <SmallClassInfo
                icon={<BookOpenText className="w-4 h-4 text-main-text" />}
                text={`${data.course.name} - ${data.course.code.toUpperCase()}`}
              />
              <SmallClassInfo
                icon={<Settings className="w-4 h-4 text-main-text" />}
                text={`${
                  data.department.name
                } - ${data.department.code.toUpperCase()}`}
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          defaultValue="announcments"
          className="w-full flex items-center justify-center">
          <TabsList className="bg-Second-black flex-wrap w-fit h-fit">
            <TabsTrigger
              className="p-4 cursor-pointer h-9"
              value="announcments">
              <Megaphone className="w-4 h-4" />
              Announcments ({data.count.announcements})
            </TabsTrigger>
            <TabsTrigger className="p-4 cursor-pointer h-9" value="assignments">
              <MdOutlineAssignment className="w-4 h-4" />
              Assignments ({data.count.assignments})
            </TabsTrigger>
            <TabsTrigger className="p-4 cursor-pointer h-9" value="exams">
              <ScrollText className="w-4 h-4" />
              Exams ({data.count.exams})
            </TabsTrigger>
            <TabsTrigger className="p-4 cursor-pointer h-9" value="students">
              <PiStudent className="w-4 h-4" />
              Students ({data.count.students})
            </TabsTrigger>
          </TabsList>

          <TabsContent className="w-full h-full" value="announcments">
            <ShowStudentAnnouncments name={name} token={token} />
          </TabsContent>
          <TabsContent className="w-full h-full" value="assignments">
            <ShowStudentAssignments name={name} token={token} />
          </TabsContent>
          <TabsContent className="w-full h-full" value="exams">
            <ShowStudentsExam name={name} token={token} />
          </TabsContent>
          <TabsContent className="w-full h-full" value="students">
            <ShowClassStudents name={name} token={token} />
          </TabsContent>
        </Tabs>
      </div>
    )
  );
}
