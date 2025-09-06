import ShowUserInfo, { AdminMainData } from "./_components/ShowUserInfo";
import { cookies } from "next/headers";
import { MainDomain } from "@/variables/MainDomain";
import UpdateUserImage from "../../_components/profile/UpdateUserImage";
import UpdateUserPasswrod from "../../_components/profile/UpdateUserPasswrod";

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
    <div className="sm:p-4 flex flex-col gap-6">
      <UpdateUserImage role="admin" token={token} userImage={adminData.image} />
      <div className="flex gap-5 flex-col lg:flex-row">
        <ShowUserInfo token={token} adminData={adminData} />
        <UpdateUserPasswrod role="admin" token={token} />
      </div>
    </div>
  );
}
