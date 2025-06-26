import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSideBar from "./_components/DashboardSideBar";
import DashboardHeader from "./_components/DashboardHeader";
import { cookies } from "next/headers";
import { VerifyUserFromToken } from "@/lib/VerifyUserFromToken";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await (await cookies()).get("token")?.value) as string;
  const user = VerifyUserFromToken(token);
  console.log("user", user);
  return (
    <div className="bg-Main-black">
      <SidebarProvider>
        <div className="flex gap-2 w-full ">
          <DashboardSideBar role={user?.role as string} />

          <main className="flex flex-col gap-2 w-full overflow-x-hidden sm:pr-3 pt-1">
            <DashboardHeader />
            <div
              style={{
                minHeight: "calc(100vh - 80px)",
              }}
              className="p-3 w-full rounded-t-2xl ">
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
