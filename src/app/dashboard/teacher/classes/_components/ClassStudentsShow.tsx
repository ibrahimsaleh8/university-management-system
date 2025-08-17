import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import LoadingSkeletonStudentsInClass from "@/app/dashboard/student/classes/[name]/_components/LoadingSkeletonStudentsInClass";
import StudentClassCard from "@/app/dashboard/student/classes/[name]/_components/StudentClassCard";

type Props = {
  className: string;
};

export type ClassStudentDataType = {
  id: number;
  name: string;
  image: string;
  email: string;
};

async function getClassStudents(
  className: string
): Promise<ClassStudentDataType[]> {
  const res = await axios.get(
    `${MainDomain}/api/get/class/${className}/students`
  );
  return res.data;
}
export default function ClassStudentsShow({ className }: Props) {
  const { error, isError, isLoading, data } = useQuery({
    queryKey: ["class_students", className],
    queryFn: () => getClassStudents(className),
  });
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

  if (error && isError) throw new Error(error.message);
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
