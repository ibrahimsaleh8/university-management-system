import Image from "next/image";
import { StudentsInClassResponseType } from "./ShowClassStudents";

export default function StudentClassCard({
  image,
  name,
  email,
}: StudentsInClassResponseType) {
  return (
    <div className="min-w-44 pt-[6.5rem] relative bg-Second-Card-bg p-4 rounded-2xl flex flex-col gap-2 items-center">
      <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 bg-low-black rounded-full flex items-center justify-center p-1 w-[110px] h-[110px]">
        <Image
          src={image}
          alt={`image ${name}`}
          className="object-cover object-center rounded-full"
          width={100}
          height={100}
        />
      </div>
      {/* Text */}
      <div className="flex flex-col items-center justify-center text-center gap-1 text-sm mt-auto">
        <p>{name}</p>
        <p>{email}</p>
      </div>
    </div>
  );
}
