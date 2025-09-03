import {
  GraduationCap,
  BookOpen,
  ClipboardList,
  CalendarDays,
} from "lucide-react";
import DashboardCard from "../../DashboardCard";
type Props = {
  academicYear: string;
  courses: number;
  assignments: number;
  exams: number;
};
export default function ShowStudentDashboardData({
  academicYear,
  assignments,
  courses,
  exams,
}: Props) {
  return (
    <div className="flex flex-col gap-3 w-full ">
      <p className="font-medium text-lg">Statistics</p>
      <div
        style={{
          gridTemplateColumns: "repeat(auto-fit,minmax(280px , 1fr))",
        }}
        className="grid gap-4">
        <DashboardCard
          describtion="Your current academic year"
          numbers={0}
          stringValue={academicYear}
          title="Academic Year"
          icon={<GraduationCap className="w-5 h-5 text-main-text" />}
        />

        <DashboardCard
          describtion="Enrolled Courses this semester"
          numbers={courses}
          title="Enrolled Courses"
          icon={<BookOpen className="w-5 h-5 text-main-text" />}
        />

        <DashboardCard
          describtion="Number of Pending Assignment"
          numbers={assignments}
          title="Pending Assignment"
          icon={<ClipboardList className="w-5 h-5 text-main-text" />}
        />

        <DashboardCard
          describtion="Number of Upcoming Exams"
          numbers={exams}
          title="Upcoming Exams"
          icon={<CalendarDays className="w-5 h-5 text-main-text" />}
        />
      </div>
    </div>
  );
}
