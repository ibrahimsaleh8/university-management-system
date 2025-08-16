import AnnouncmentCard, {
  AnnouncementInfoType,
} from "@/app/dashboard/_components/AnnouncmentCard";
import AddingModel from "@/app/dashboard/_components/forms/AddingModel";
import { Skeleton } from "@/components/ui/skeleton";
import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Props = {
  token: string;
  classId: number;
  className: string;
};

async function getAnnouncments(
  className: string
): Promise<AnnouncementInfoType[]> {
  const res = await axios.get(
    `${MainDomain}/api/get/class/${className}/announcements`
  );
  return res.data;
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
    <div className="flex flex-col gap-2">
      <Skeleton className="w-44 h-10 ml-auto" />
      <Skeleton className="w-full h-56 " />
    </div>
  ) : (
    announcements && (
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center gap-3 flex-wrap">
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
                className={className}
                token={token}
                {...ann}
                key={ann.id}
              />
            ))}
          </div>
        ) : (
          <div className="w-full h-32 bg-Second-black flex items-center justify-center text-low-white rounded-md">
            No announcements founded..
          </div>
        )}
      </div>
    )
  );
}
