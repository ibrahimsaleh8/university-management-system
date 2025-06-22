import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSideBar from "./_components/DashboardSideBar";
import DashboardHeader from "./_components/DashboardHeader";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-Main-black">
      <SidebarProvider>
        <div className="flex gap-2 w-full ">
          <DashboardSideBar />

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
