import ShowUserInfo, { AdminMainData } from "./_components/ShowUserInfo";
import { cookies } from "next/headers";
import { MainDomain } from "@/variables/MainDomain";
import UpdateUserPasswrod from "../../_components/profile/UpdateUserPasswrod";
import AdminTopProfile from "./_components/AdminTopProfile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Profile",
};

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
  if (!res.ok) {
    throw new Error("Failed to fetch admin profile");
  }

  const adminData: AdminMainData & {
    image: string;
  } = await res.json();

  return (
    <div className="sm:p-4 flex flex-col gap-6">
      <AdminTopProfile
        email={adminData.email}
        first_name={adminData.first_name}
        image={adminData.image}
        last_name={adminData.last_name}
        token={token}
      />
      <Tabs
        defaultValue="overview"
        className="bg-main-dark border border-soft-border p-4 rounded-2xl">
        <TabsList className="profile-tab-list">
          <TabsTrigger className="profile-tab-trigger" value="overview">
            Overview
          </TabsTrigger>
          <TabsTrigger className="profile-tab-trigger" value="password">
            Password
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="p-4 sm:p-1 mt-5 lg:mt-5">
          <ShowUserInfo token={token} adminData={adminData} />
        </TabsContent>
        <TabsContent className="p-4 sm:p-1 mt-5 lg:mt-5" value="password">
          <UpdateUserPasswrod role="admin" token={token} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
