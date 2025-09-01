import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";
import TableCourseStudents from "./TableCourseStudents";
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";
type Props = {
  courseId: string;
  token: string;
};

async function getCourseStudents(id: string, token: string) {
  const res = await axios.get(
    `${MainDomain}/api/get/teacher-courses/${id}/students`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}

export default function ShowCourseStudents({}: Props) {
  return (
    <div className="w-full p-4 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center gap-4 justify-between flex-wrap">
        <p className="font-bold text-xl capitalize">
          student roster and grading
        </p>

        <div className="bg-Second-Card-bg flex items-center gap-1 w-fit rounded-md pl-3">
          <Search className="w-4 h-4 text-low-white" />
          <Input
            type="search"
            placeholder="Search by name"
            className="bg-Second-Card-bg focus-visible:border-transparent"
          />
        </div>
      </div>

      <TableCourseStudents />
    </div>
  );
}
