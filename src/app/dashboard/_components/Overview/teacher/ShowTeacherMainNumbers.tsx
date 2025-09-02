import { BookOpenText, FileCheck, GraduationCap } from "lucide-react";
import DashboardCard from "../../DashboardCard";
import { SiGoogleclassroom } from "react-icons/si";

type Props = {
  activeClasses: number;
  activeCourses: number;
  totalStudents: number;
  upcomingExams: number;
};
export default function ShowTeacherMainNumbers({
  activeClasses,
  activeCourses,
  totalStudents,
  upcomingExams,
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
          describtion="Number of students"
          numbers={totalStudents}
          title="Total Students"
          icon={<GraduationCap className="w-5 h-5 text-main-text" />}
        />
        <DashboardCard
          describtion="Number of active courses"
          numbers={activeCourses}
          title="Active Courses"
          icon={<BookOpenText className="w-5 h-5 text-main-text" />}
        />
        <DashboardCard
          describtion="Number of active classes"
          numbers={activeClasses}
          title="Active Classes"
          icon={<SiGoogleclassroom className="w-5 h-5 text-main-text" />}
        />
        <DashboardCard
          describtion="Number of scheduled exams"
          numbers={upcomingExams}
          title="Upcoming Exams"
          icon={<FileCheck className="w-5 h-5 text-main-text" />}
        />
      </div>
    </div>
  );
}
