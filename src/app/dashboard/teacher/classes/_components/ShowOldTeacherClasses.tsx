"use client";

import ClassCard, {
  ClassTeacherData,
} from "@/app/dashboard/_components/ClassCard";
import SmallLoader from "@/components/Global/SmallLoader";
import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

async function getOldTeacherClasses(
  token: string
): Promise<ClassTeacherData[]> {
  try {
    const res = await axios.get(`${MainDomain}/api/get/old-teacher-classes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
}
export default function ShowOldTeacherClasses({ token }: { token: string }) {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["old_teacher_classes", token],
    queryFn: () => getOldTeacherClasses(token),
  });

  if (isError && error) throw new Error(error.message);

  return isLoading && !data ? (
    <div className="flex items-center justify-center w-full p-4">
      <SmallLoader color="white" />
    </div>
  ) : (
    data && data.length > 0 && (
      <div className="flex flex-col gap-4">
        <p className="text-lg font-medium  text-low-white capitalize border-t border-soft-border pt-4">
          old classes
        </p>
        <div
          style={{
            gridTemplateColumns: "repeat(auto-fill,minmax(320px , 1fr))",
          }}
          className="grid gap-4">
          {data.map((cls) => (
            <ClassCard {...cls} key={cls.id} />
          ))}
        </div>
      </div>
    )
  );
}
