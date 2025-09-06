import React from "react";
import ShowUserInfo, { AdminMainData } from "./_components/ShowUserInfo";
import { cookies } from "next/headers";
import { MainDomain } from "@/variables/MainDomain";
import UpdateUserImage from "./_components/UpdateUserImage";

export default async function AdminProfilePage() {
  const token = (await (await cookies()).get("token")?.value) as string;

  const res = await fetch(`${MainDomain}/api/get/profile/admin`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["admin_data"],
    },
  });

  const adminData: AdminMainData & {
    image: string;
  } = await res.json();

  return (
    <div className="p-4 flex flex-col gap-4">
      <UpdateUserImage token={token} userImage={adminData.image} />
      <div className="flex gap-4">
        <ShowUserInfo token={token} adminData={adminData} />
      </div>
    </div>
  );
}
