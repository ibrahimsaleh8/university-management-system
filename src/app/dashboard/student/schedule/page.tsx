import { MainDomain } from "@/variables/MainDomain";
import { cookies } from "next/headers";
import { EventDataType } from "../../_components/Calender/CalenderTable";
import { GetCurrentSemester } from "./_components/actions/GetCurrentSemester";
import SchedualTable from "./_components/SchedualTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShowMainSchedual from "../../teacher/_components/ShowMainSchedual";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Scheduale",
};

export default async function TeacherSchedulePage() {
  const token = (await (await cookies()).get("token")?.value) as string;

  const res = await fetch(`${MainDomain}/api/get/student-scheduals`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      revalidate: 300,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const schedualData: EventDataType[] = await res.json();

  const semester = await GetCurrentSemester();
  return (
    <div className="p-4 flex flex-col gap-4">
      {semester && (
        <p className="text-xl font-bold capitalize">
          Your Table schedule for current semester{" "}
          <span className="text-main-text">{semester.name}</span>
        </p>
      )}
      <Tabs defaultValue="calender" className="w-full">
        <TabsList className="bg-Second-black rounded-md gap-5 border-b overflow-hidden pb-0 pl-0 border-Second-Card-bg">
          <TabsTrigger
            className="!text-base px-4 pl-5 !border-0 !rounded-none data-[state=active]:!bg-transparent data-[state=active]:!text-main-text data-[state=active]:!border-b data-[state=active]:!border-main-text"
            value="calender">
            Calender
          </TabsTrigger>
          <TabsTrigger
            className="!text-base px-4 pr-5 !border-0 !rounded-none data-[state=active]:!bg-transparent data-[state=active]:!text-main-text data-[state=active]:!border-b data-[state=active]:!border-main-text"
            value="table">
            Table
          </TabsTrigger>
        </TabsList>
        <TabsContent value="calender">
          <ShowMainSchedual data={schedualData} />
        </TabsContent>
        <TabsContent value="table">
          <SchedualTable data={schedualData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
