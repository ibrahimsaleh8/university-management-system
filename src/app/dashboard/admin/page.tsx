import AnnouncementCard from "../_components/AnnouncementCard";
import { GenderChart } from "../_components/Charts/GenderChart";
import { UsersCountChart } from "../_components/Charts/UsersCountChart";
import DashboardCard from "../_components/DashboardCard";
import { HiOutlineSpeakerphone } from "react-icons/hi";

export default function AdminDashboard() {
  return (
    <div className="flex gap-4 w-full flex-col ">
      {/* Statics */}
      <div className="flex flex-col gap-3 w-full ">
        <p className="font-medium text-lg">Statics</p>
        <div
          style={{
            gridTemplateColumns: "repeat(auto-fit,minmax(280px , 1fr))",
          }}
          className="grid gap-4">
          {Array.from({ length: 4 }).map((_e, i) => (
            <DashboardCard key={i} />
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="flex gap-2 flex-col lg:flex-row">
        <GenderChart />
        <UsersCountChart />
      </div>

      {/* Announcements */}
      <div className="flex flex-col gap-3 px-3  w-full">
        <p className="flex items-center justify-between font-medium text-lg">
          Announcements <HiOutlineSpeakerphone />
        </p>

        {Array.from({ length: 5 }).map((_e, i) => (
          <AnnouncementCard key={i} />
        ))}
      </div>
    </div>
  );
}
