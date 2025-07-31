"use client";
import { MainDomain } from "@/variables/MainDomain";
import axios from "axios";
import { StudentClassesResponseType } from "./ShowUnRegisterdClasses";
import { useQuery } from "@tanstack/react-query";
import StudnetClassesSkeleton from "./StudnetClassesSkeleton";
import StudentClassCard from "./StudentClassCard";

type Props = {
  token: string;
};
async function getRegisterdCourses(
  token: string
): Promise<StudentClassesResponseType[]> {
  const res = await axios.get(
    `${MainDomain}/api/get/student-registerd-classes`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}
export default function ShowRegisterdClasses({ token }: Props) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["registerd_courses"],
    queryFn: () => getRegisterdCourses(token),
  });
  if (error && isError) throw new Error(error.message);
  return isLoading ? (
    <StudnetClassesSkeleton />
  ) : data && data.length > 0 ? (
    <div className="flex flex-col gap-3 items-start">
      {/* Header */}
      <div className="text-center mx-auto">
        <p className="font-bold text-2xl text-main-text">Classes</p>
        <p className="text-sm text-low-white max-w-[30rem]">
          Welcome back! Your academic journey continues here. Select a class to
          get started.
        </p>
      </div>
      <div className="flex gap-4 flex-wrap">
        {data.map((cls) => (
          <StudentClassCard
            type="show"
            key={cls.id}
            token={token}
            classData={cls}
          />
        ))}
      </div>
    </div>
  ) : (
    <div className="w-full h-32 rounded-sm bg-Second-black text-low-white flex items-center justify-center">
      You {"Didn't"} Join to Any Class{" "}
    </div>
  );
}
