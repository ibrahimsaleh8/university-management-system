"use client";
import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import StudentClassAnnouncmentCard from "./StudentClassAnnouncmentCard";
import LoadingTab from "./LoadingTab";
import { AttachemntsFilesDataType } from "@/app/dashboard/teacher/classes/_components/TeacherClassAnnouncments";

type Props = {
  token: string;
  name: string;
};
export type StudentClassAnnouncmentsDataType = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  replies: number;
  likes: number;
  dislikes: number;
  isLiked: boolean;
  isDisLiked: boolean;
  teacher: {
    first_name: string;
    last_name: string;
    image: string;
  };
  attachments: AttachemntsFilesDataType[];
};

async function getAnnouncments(
  name: string,
  token: string
): Promise<StudentClassAnnouncmentsDataType[]> {
  try {
    const res = await axios.get(
      `${MainDomain}/api/get/student-registerd-classes/${name}/get-announcments`,
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
export default function ShowStudentAnnouncments({ name, token }: Props) {
  const { data: announcments, isLoading } = useQuery({
    queryKey: ["student_class_announcments", name],
    queryFn: () => getAnnouncments(name, token),
  });

  return isLoading ? (
    <LoadingTab />
  ) : (
    announcments && (
      <div className="flex flex-col gap-4 items-center w-full">
        {announcments.length > 0 ? (
          announcments.map((ann) => (
            <StudentClassAnnouncmentCard
              key={ann.id}
              data={ann}
              name={name}
              token={token}
            />
          ))
        ) : (
          <div className="w-full h-36 rounded-md flex text-white items-center justify-center bg-main-dark border border-soft-border">
            No Announcement Published Yet...
          </div>
        )}
      </div>
    )
  );
}
