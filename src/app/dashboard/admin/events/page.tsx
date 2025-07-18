import { cookies } from "next/headers";
import AddingModel from "../../_components/forms/AddingModel";
import ShowAllEvents from "./_components/ShowAllEvents";

export default async function EventsPage() {
  const token = (await cookies()).get("token")?.value as string;

  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <p className="font-bold">Events</p>
        <AddingModel AddType="Event" token={token} />
      </div>
      <ShowAllEvents />
    </div>
  );
}
