"use client";

import { MainDomain } from "@/variables/MainDomain";
import axios, { AxiosError } from "axios";
import { StudentClassesResponseType } from "./ShowUnRegisterdClasses";
import { useQuery } from "@tanstack/react-query";
import StudentClassCard from "./StudentClassCard";
import SmallLoader from "@/components/Global/SmallLoader";

type Props = {
  token: string;
};
async function getRegisterdCourses(
  token: string
): Promise<StudentClassesResponseType[]> {
  try {
    const res = await axios.get(
      `${MainDomain}/api/get/student-finished-classes`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
}
export default function ShowFinishedClasses({ token }: Props) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["finished_classes"],
    queryFn: () => getRegisterdCourses(token),
  });
  if (error && isError) throw new Error(error.message);
  return isLoading ? (
    <div className="text-low-white flex items-center gap-2 justify-center text-center">
      <SmallLoader color="white" />
      Loading old courses ...
    </div>
  ) : data && data.length > 0 ? (
    <div className="flex flex-col gap-3 items-start">
      {/* Header */}

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
    <div className="w-full h-32 capitalize rounded-sm bg-Second-black text-low-white flex items-center justify-center">
      we {"didn't"} found old classes
    </div>
  );
}
