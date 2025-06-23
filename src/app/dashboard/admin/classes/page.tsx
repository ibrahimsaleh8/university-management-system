import { Button } from "@/components/ui/button";
import courseImage from "@images/icons/course.png";
import studentImage from "@images/icons/student.png";
import teacherImage from "@images/icons/teacher.png";
import classImage from "@images/icons/class.png";
import Image from "next/image";
export default function ClassesPage() {
  return (
    <div className="flex flex-col gap-5">
      <p className="font-bold">Classes</p>
      <div className="flex gap-3 flex-wrap">
        <div className="bg-Second-black w-96 rounded-md class-card p-10 flex flex-col gap-3">
          <div className="bg-white w-20 h-20 mx-auto flex items-center justify-center rounded-full overflow-hidden">
            <Image className="w-14" src={classImage} alt="class image" />
          </div>

          {/* Informations */}
          <div>
            <p className="flex gap-1 items-center ">
              <Image className="w-6" src={classImage} alt="class image" />
              Class-Name
            </p>
            <p className="flex gap-1 items-center ">
              <Image className="w-6" src={teacherImage} alt="class image" />
              Teachers: 2
            </p>
            <p className="flex gap-1 items-center ">
              <Image className="w-6" src={studentImage} alt="class image" />
              Students: 100
            </p>
            <p className="flex gap-1 items-center ">
              <Image className="w-6" src={courseImage} alt="class image" />
              Courses: 30
            </p>
          </div>
          {/* Buttons */}
          <div className="flex flex-col gap-2 border-t border-soft-border pt-3">
            <Button className="bg-main-text text-Main-black hover:bg-main-text hover:text-Main-black">
              Edit
            </Button>
            <Button variant={"destructive"}>Delete</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
