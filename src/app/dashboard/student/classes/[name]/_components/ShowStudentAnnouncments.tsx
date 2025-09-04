"use client";
import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import StudentClassAnnouncmentCard from "./StudentClassAnnouncmentCard";
import { Skeleton } from "@/components/ui/skeleton";

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
};

async function getAnnouncments(
  name: string,
  token: string
): Promise<StudentClassAnnouncmentsDataType[]> {
  const res = await axios.get(
    `${MainDomain}/api/get/student-registerd-classes/${name}/get-announcments`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}
export default function ShowStudentAnnouncments({ name, token }: Props) {
  const { data: announcments, isLoading } = useQuery({
    queryKey: ["student_class_announcments", name],
    queryFn: () => getAnnouncments(name, token),
  });

  return isLoading ? (
    <div className="flex flex-col gap-3 items-center">
      <Skeleton className="sm:w-[45rem] w-full h-72" />
      <Skeleton className="sm:w-[45rem] w-full h-72" />
    </div>
  ) : (
    announcments && (
      <div className="flex flex-col gap-3 items-center lg:w-[80%] md:w-[90%] w-full mx-auto">
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
          <div className="sm:w-[40rem] w-full h-52 rounded-2xl flex text-low-white items-center justify-center bg-card-bg">
            No Announcement Published Yet...
          </div>
        )}
      </div>
    )
  );
}
