import AnnouncmentCard from "@/app/dashboard/_components/AnnouncmentCard";
import AddingModel from "@/app/dashboard/_components/forms/AddingModel";
import LoadingTab from "@/app/dashboard/student/classes/[name]/_components/LoadingTab";
import { AttachmentsFileType } from "@/lib/globalTypes";
import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
export type AttachemntsFilesDataType = {
  id: string;
  name: string;
  url: string;
  type: AttachmentsFileType;
};
type Props = {
  token: string;
  classId: number;
  className: string;
};
export type AnnouncementClassDataType = {
  id: string;
  title: string;
  content: string;
  created_at: Date;
  replies: number;
  teacher: {
    first_name: string;
    last_name: string;
    image: string;
  };
  likes: number;
  dislikes: number;
  attachments: AttachemntsFilesDataType[];
};

async function getAnnouncments(
  className: string
): Promise<AnnouncementClassDataType[]> {
  try {
    const res = await axios.get(
      `${MainDomain}/api/get/class/${className}/announcements`
    );
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
}

export default function TeacherClassAnnouncments({
  token,
  classId,
  className,
}: Props) {
  const { data: announcements, isLoading } = useQuery({
    queryKey: ["class_announcment", className],
    queryFn: () => getAnnouncments(className),
  });

  return isLoading && !announcements ? (
    <LoadingTab />
  ) : (
    announcements && (
      <div className="flex flex-col gap-6">
        <div className="flex justify-end items-center gap-3">
          <AddingModel
            title="Announcement"
            AddType="Teacher Announcement"
            token={token}
            classId={classId}
            className={className}
          />
        </div>
        {announcements.length > 0 ? (
          <div className="flex flex-col gap-3">
            {announcements.map((ann) => (
              <AnnouncmentCard
                key={ann.id}
                className={className}
                token={token}
                {...ann}
              />
            ))}
          </div>
        ) : (
          <div className="w-full h-36 border border-soft-border bg-main-dark flex items-center justify-center text-white rounded-md">
            No announcements founded..
          </div>
        )}
      </div>
    )
  );
}
