import { GenderChart } from "../_components/Charts/GenderChart";
import { UsersCountChart } from "../_components/Charts/UsersCountChart";
import LatestEvents, {
  LatestEventDataType,
} from "../_components/Overview/admin/LatestEvents";
import RecentRegisterdStudents, {
  LatestStudentsDataType,
} from "../_components/Overview/admin/RecentRegisterdStudents";
import StatisticsMainCards from "../_components/Overview/admin/StatisticsMainCards";
import { GetDashboardNumbers } from "../_components/ServerActions/GetDashboardNumbers";
import { GetLatestEvents } from "../_components/ServerActions/GetLatestEvents";
import { GetLatestRegisterdStudents } from "../_components/ServerActions/GetLatestRegisterdStudents";

export default async function AdminDashboard() {
  const {
    courses,
    enrollments,
    students,
    teachers,
    female,
    male,
    firstGrade,
    fourthGrade,
    graduated,
    secondGrade,
    thirdGrade,
  } = await GetDashboardNumbers();

  const latestStudents: LatestStudentsDataType[] =
    await GetLatestRegisterdStudents();

  const events: LatestEventDataType[] = await GetLatestEvents();

  return (
    <div className="flex gap-4 w-full flex-col ">
      {/*  Statistics */}
      <StatisticsMainCards
        courses={courses}
        enrollments={enrollments}
        students={students}
        teachers={teachers}
      />

      {/* Charts */}
      <div className="flex gap-2 flex-col lg:flex-row">
        <GenderChart female={female} male={male} totalStudents={students} />
        <UsersCountChart
          first={firstGrade}
          fourth={fourthGrade}
          graduated={graduated}
          second={secondGrade}
          third={thirdGrade}
        />
      </div>

      {/* Bottom */}
      <div className="flex gap-2 flex-col lg:flex-row">
        <RecentRegisterdStudents students={latestStudents} />
        <LatestEvents events={events} />
      </div>
    </div>
  );
}
