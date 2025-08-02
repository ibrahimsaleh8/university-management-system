"use client";

import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BookOpenText, Megaphone, Settings } from "lucide-react";
import SmallClassInfo from "./SmallClassInfo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
type Props = {
  token: string;
  name: string;
};
// types/api.ts
export type StudentClassDetailResponse = {
  id: string;
  name: string;
  teacher: {
    first_name: string;
    last_name: string;
    gender: string;
    email: string;
    image: string;
  };
  announcements: {
    id: string;
    content: string;
    title: string;
    created_at: string;
    replies: number;
  }[];
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
    `${MainDomain}/api/get/student-registerd-classes/${className}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}
export default function ShowStudentClassInfo({ name, token }: Props) {
  const {} = useQuery({
    queryKey: ["student_class_info", name],
    queryFn: () => getClassInfoApi(token, name),
  });

  return (
    <div className="flex flex-col gap-2">
      {/* Teacher Data */}
      <div className="flex items-start gap-2 bg-card-bg w-fit overflow-hidden px-3 py-1 rounded-md">
        <img
          className="w-11 h-11 object-cover  object-center rounded-full"
          src="https://res.cloudinary.com/dnriyuqpv/image/upload/v1753802858/students/jt2tgm0xwku2umqlv6jb.png"
          alt="teacher-image"
        />
        <div className="flex flex-col gap-0.5 text-low-white text-sm">
          <p>Mr/ asfdad dasda</p>
          <p>jonawec@mailinator.com</p>
        </div>
      </div>

      {/* Header */}
      <div className="w-full bg-Second-black rounded-2xl p-3 flex flex-col gap-10 border border-soft-border">
        {/* text */}
        <div className="flex items-center justify-center">
          <p className="font-bold text-xl capitalize">Noyan</p>
        </div>

        {/* Info */}
        {/* Small Info */}
        <div className="flex items-center gap-6 flex-wrap justify-center mt-auto">
          <SmallClassInfo
            icon={<BookOpenText className="w-4 h-4 text-main-text" />}
            text="Course Name - dsa"
          />
          <SmallClassInfo
            icon={<Settings className="w-4 h-4 text-main-text" />}
            text="Department - CS"
          />
        </div>
      </div>
      <div className="flex items-center gap-2"></div>

      {/* Tabs */}
      <Tabs defaultValue="account" className="w-fit">
        <TabsList className="bg-Second-black">
          <TabsTrigger className="p-4 cursor-pointer" value="account">
            <Megaphone className="w-4 h-4" />
            Announcments (12)
          </TabsTrigger>
          <TabsTrigger className="p-4 cursor-pointer" value="account1">
            Assignments (21)
          </TabsTrigger>
          <TabsTrigger className="p-4 cursor-pointer" value="account2">
            Exams (10)
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}
