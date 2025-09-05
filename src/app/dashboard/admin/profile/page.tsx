import Image from "next/image";
import React from "react";
import ShowUserInfo, { AdminMainData } from "./_components/ShowUserInfo";
import { cookies } from "next/headers";
import { MainDomain } from "@/variables/MainDomain";

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
      <Image
        src={adminData.image}
        alt="Admin Image"
        width={1000}
        height={1000}
        className="w-28 h-28 rounded-full object-cover object-center mx-auto"
      />
      <div className="flex gap-4">
        <ShowUserInfo token={token} adminData={adminData} />
        <div className="w-full bg-Second-black rounded-2xl"></div>
      </div>
    </div>
  );
}
