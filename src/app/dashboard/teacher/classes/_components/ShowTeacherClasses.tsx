"use client";

import ClassCard, {
  ClassTeacherData,
} from "@/app/dashboard/_components/ClassCard";
import { Skeleton } from "@/components/ui/skeleton";
import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
async function getTeacherClasses(token: string): Promise<ClassTeacherData[]> {
  const res = await axios.get(`${MainDomain}/api/get/teacher-classes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}
export default function ShowTeacherClasses({ token }: { token: string }) {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["teacher_classes"],
    queryFn: () => getTeacherClasses(token),
  });

  if (isError && error) throw new Error(error.message);

  return isLoading && !data ? (
    <div
      style={{
        gridTemplateColumns: "repeat(auto-fill,minmax(320px , 1fr))",
      }}
      className="grid gap-4">
      <Skeleton className="w-full h-96" />
      <Skeleton className="w-full h-96" />
      <Skeleton className="w-full h-96" />
      <Skeleton className="w-full h-96" />
    </div>
  ) : data && data.length > 0 ? (
    <div
      style={{
        gridTemplateColumns: "repeat(auto-fill,minmax(320px , 1fr))",
      }}
      className="grid gap-4">
      {data.map((cls) => (
        <ClassCard {...cls} key={cls.id} />
      ))}
    </div>
  ) : (
    <div className="capitalize w-full bg-Second-black rounded-md h-32 flex items-center justify-center text-low-white">
      no classes found active in current semester..
    </div>
  );
}
