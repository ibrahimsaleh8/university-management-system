import Image from "next/image";
import courseImage from "@images/course-icon.png";
type Props = {
  courseName: string;
  department: string;
  semester: string;
};
export default function TeacherCourseCard({
  courseName,
  department,
  semester,
}: Props) {
  return (
    <div className="bg-Second-black w-full rounded-md flex items-start gap-4 p-3">
      <Image className="w-7 h-7" src={courseImage} alt="Course Icon" />
      {/* Text */}
      <div className="capitalize">
        <p className="font-bold">{courseName}</p>
        <p>
          Department: <span className="text-sm">{department}</span>
        </p>
        <p>
          Semester: <span className="text-sm">{semester}</span>
        </p>
      </div>
    </div>
  );
}
