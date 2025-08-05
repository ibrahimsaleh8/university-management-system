"use client";

import ClassCard, {
  ClassTeacherData,
} from "@/app/dashboard/_components/ClassCard";
import { Skeleton } from "@/components/ui/skeleton";
import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
async function getTeacherClasses(id: number): Promise<ClassTeacherData[]> {
  const res = await axios.get(`${MainDomain}/api/get/teacher-classes/${id}`);
  return res.data;
}
export default function ShowTeacherClasses({ uid }: { uid: number }) {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["teacher_classes", uid],
    queryFn: () => getTeacherClasses(uid),
  });

  if (isError && error) throw new Error(error.message);

  return (
    <div className="pt-3 flex flex-col gap-3">
      {isLoading && !data ? (
        <>
          <Skeleton className="w-full h-28 " />
          <Skeleton className="w-full h-28 " />
          <Skeleton className="w-full h-28 " />
        </>
      ) : (
        data && (
          <>
            {data.length > 0 ? (
              data.map((cls) => <ClassCard {...cls} key={cls.id} />)
            ) : (
              <div className="w-full bg-Second-black rounded-md h-32 flex items-center justify-center text-low-white">
                No Classes Found..
              </div>
            )}
          </>
        )
      )}
    </div>
  );
}
