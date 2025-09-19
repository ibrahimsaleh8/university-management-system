import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSideBar from "./_components/sidebar/DashboardSideBar";
import DashboardHeader from "./_components/DashboardHeader";
import { cookies } from "next/headers";
import { VerifyUserFromToken } from "@/lib/VerifyUserFromToken";
import NextTopLoader from "nextjs-toploader";
import { DashboardAuthGuard } from "@/lib/AuthGuard/DashboardAuthGuard";
export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get("token")?.value as string;
  const user = VerifyUserFromToken(token);
  return (
    <div className="bg-Main-black">
      <NextTopLoader zIndex={1600} color="#b9f821" height={3} easing="ease" />
      <SidebarProvider>
        <div className="flex gap-0 w-full">
          <DashboardSideBar role={user?.role as string} />

          <main className="flex flex-col gap-2 w-full overflow-x-hidden sm:pr-3 pt-0.5 sm:pt-1">
            <DashboardHeader />
            <div
              style={{
                minHeight: "calc(100vh - 80px)",
              }}
              className="p-4 w-full relative bg-low-black">
              <DashboardAuthGuard userRole={user ? user.role : null}>
                {children}
              </DashboardAuthGuard>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
