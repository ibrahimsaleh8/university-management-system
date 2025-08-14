"use client";

import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import StudentClassCard from "./StudentClassCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import LoadingSkeletonStudentsInClass from "./LoadingSkeletonStudentsInClass";

type Props = {
  name: string;
  token: string;
};

export type StudentsInClassResponseType = {
  id: number;
  name: string;
  email: string;
  image: string;
};

async function getStudentsInClassApi(
  className: string,
  token: string
): Promise<StudentsInClassResponseType[]> {
  const res = await axios.get(
    `${MainDomain}/api/get/student-class/${className}/students`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}

export default function ShowClassStudents({ name, token }: Props) {
  const { isError, error, isLoading, data } = useQuery({
    queryKey: ["students_in_class", name],
    queryFn: () => getStudentsInClassApi(name, token),
  });
  if (error && isError) throw new Error(error.message);
  const [stdName, setStdName] = useState("");

  const students = useMemo(() => {
    if (data) {
      return stdName.trim().length > 0
        ? data.filter((std) =>
            std.name.toLowerCase().includes(stdName.toLowerCase())
          )
        : data;
    }
  }, [data, stdName]);

  return isLoading ? (
    <LoadingSkeletonStudentsInClass />
  ) : (
    students && (
      <div className="flex flex-col gap-10">
        {/* Search */}
        <div className="flex flex-col gap-1 sm:w-72 w-[96%]">
          <label htmlFor="std-search" className="font-medium text-sm">
            Search:
          </label>
          <div className="flex items-center gap-1 bg-Second-black px-3 h-10 rounded-md border border-soft-border">
            <Search className="w-4 h-4 text-low-white" />
            <Input
              onChange={(e) => setStdName(e.target.value)}
              id="std-search"
              type="text"
              className="focus-visible:border-transparent w-full h-full"
              placeholder="Search by student name"
            />
          </div>
        </div>
        <div
          style={{
            gridTemplateColumns: "repeat(auto-fill,minmax(280px , 1fr))",
          }}
          className="grid gap-4">
          {students.length > 0 ? (
            students.map((std) => <StudentClassCard {...std} key={std.id} />)
          ) : (
            <div className="p-4 text-low-white font-medium">
              No Students Found...
            </div>
          )}
        </div>
      </div>
    )
  );
}
