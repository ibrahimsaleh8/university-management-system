"use client";

import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LatestAnnouncmentsCard from "./LatestAnnouncmentsCard";
export type LatestAnnouncementType = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  className: string;
};
async function getLatestAnnouncments(
  token: string
): Promise<LatestAnnouncementType[]> {
  const res = await axios.get(`${MainDomain}/api/get/latest-announcments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export default function ShowLatestAnnouncmentsTeacher({
  token,
}: {
  token: string;
}) {
  const { data } = useQuery({
    queryKey: ["get_latest_announcments"],
    queryFn: () => getLatestAnnouncments(token),
  });
  console.log(data);
  return (
    <div className="flex flex-col gap-2">
      {data &&
        (data.length > 0 ? (
          <div className="flex flex-col gap-1">
            {data.map((ann) => (
              <LatestAnnouncmentsCard {...ann} key={ann.id} />
            ))}
          </div>
        ) : (
          <div className="w-full bg-Second-black flex items-center justify-center h-32 text-low-white">
            No Announcments Found..
          </div>
        ))}
    </div>
  );
}
