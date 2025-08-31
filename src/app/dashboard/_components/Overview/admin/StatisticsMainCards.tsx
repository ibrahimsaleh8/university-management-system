import { BookOpenText, GraduationCap, Users } from "lucide-react";
import { FaChalkboardTeacher } from "react-icons/fa";
import DashboardCard from "../../DashboardCard";
type Props = {
  teachers: number;
  students: number;
  courses: number;
  enrollments: number;
};
export default function StatisticsMainCards({
  courses,
  enrollments,
  students,
  teachers,
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
          numbers={students}
          title="students"
          icon={<GraduationCap className="w-5 h-5 text-main-text" />}
        />
        <DashboardCard
          describtion="Number of total teachers"
          numbers={teachers}
          title="teachers"
          icon={<FaChalkboardTeacher className="w-5 h-5 text-main-text" />}
        />
        <DashboardCard
          describtion="Number of Active Courses"
          numbers={courses}
          title="courses"
          icon={<BookOpenText className="w-5 h-5 text-main-text" />}
        />
        <DashboardCard
          describtion="Number of Enrollments this semester"
          numbers={enrollments}
          title="Enrollments"
          icon={<Users className="w-5 h-5 text-main-text" />}
        />
      </div>
    </div>
  );
}
