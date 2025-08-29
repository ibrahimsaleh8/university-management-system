import { BookMarked } from "lucide-react";
import AssignedCoursesCard from "./AssignedCoursesCard";
type Props = {
  courses: {
    id: string;
    name: string;
    code: string;
    credits: number;
    semester: {
      name: string;
    };
  }[];
};
export default function UserAssignedCard({ courses }: Props) {
  return (
    <div className="bg-Second-black rounded-2xl lg:flex-1 w-full p-4 px-6 pb-10 flex flex-col gap-4">
      <p className="flex items-center gap-1.5 font-bold">
        <BookMarked className="w-5 h-5 text-main-text" />
        Assigned Courses
      </p>

      <div className="flex flex-col gap-2">
        {courses.map((course) => (
          <AssignedCoursesCard
            key={course.id}
            code={course.code}
            hours={course.credits}
            name={course.name}
            semester={course.semester.name}
          />
        ))}
      </div>
    </div>
  );
}
