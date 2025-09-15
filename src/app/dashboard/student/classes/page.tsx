import { cookies } from "next/headers";
import ShowUnRegisterdClasses from "./_components/ShowUnRegisterdClasses";
import ShowRegisterdClasses from "./_components/ShowRegisterdClasses";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShowFinishedClasses from "./_components/ShowFinishedClasses";
export default async function StudentCalsses() {
  const token = (await (await cookies()).get("token")?.value) as string;
  return (
    <div className="flex flex-col gap-3">
      <Tabs defaultValue="registerd" className="w-full">
        <TabsList className="bg-Second-black">
          <TabsTrigger
            className="px-3 data-[state=active]:text-black data-[state=active]:bg-white"
            value="registerd">
            Registerd Classes
          </TabsTrigger>
          <TabsTrigger
            className="px-3 data-[state=active]:text-black data-[state=active]:bg-white"
            value="unregisterd">
            Unregisterd Classes
          </TabsTrigger>
          <TabsTrigger
            className="px-3 data-[state=active]:text-black data-[state=active]:bg-white"
            value="finished">
            Finished Classes
          </TabsTrigger>
        </TabsList>
        <TabsContent value="registerd">
          <ShowRegisterdClasses token={token} />
        </TabsContent>
        <TabsContent value="unregisterd">
          <ShowUnRegisterdClasses token={token} />
        </TabsContent>
        <TabsContent value="finished">
          <ShowFinishedClasses token={token} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
