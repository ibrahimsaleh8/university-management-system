import { GenderChart } from "../_components/Charts/GenderChart";
import { UsersCountChart } from "../_components/Charts/UsersCountChart";
import StatisticsMainCards from "../_components/Overview/admin/StatisticsMainCards";
import { GetDashboardNumbers } from "../_components/ServerActions/GetDashboardNumbers";

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

      <div className="w-96 h-80 bg-Second-black rounded-2xl flex flex-col gap-3 p-4">
        <p className="font-bold">Recent Registered Students</p>
        <div className="flex flex-col gap-4"></div>
      </div>
    </div>
  );
}
