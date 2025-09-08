"use client";
import { GetDateFromTime } from "@/lib/GetDateFromTime";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import UpdateBioAndImage from "./UpdateBioAndImage";
import { useState } from "react";

type Props = {
  token: string;
  image: string;
  first_name: string;
  last_name: string;
  teacher_id: string;
  departmentName: string;
  email: string;
  phone: string;
  bio: string | null;
  created_at: Date;
};
export default function TeacherTopData({
  bio,
  created_at,
  departmentName,
  email,
  first_name,
  image,
  last_name,
  phone,
  teacher_id,
  token,
}: Props) {
  const [currentImage, setCurrentImage] = useState(image);
  return (
    <div className="flex flex-col gap-5 bg-main-dark border border-soft-border rounded-2xl p-4 ">
      <div className="flex items-center justify-between gap-4 flex-wrap sm:pr-4">
        <div className="flex gap-5 flex-wrap">
          <div className="w-fit border-2 rounded-full h-fit border-glass-green">
            <Image
              src={currentImage}
              alt=" Image"
              width={1000}
              height={1000}
              className="w-32 h-32 rounded-full object-cover object-center mx-auto"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">
              Dr. {first_name} {last_name}
            </h1>
            <p className="text-sm text-main-text">ID: {teacher_id}</p>
            <p className="capitalize text-low-white">
              Department of {departmentName}
            </p>
            <p className="capitalize text-low-white">
              joined {GetDateFromTime(created_at)}
            </p>

            <div className="flex items-center flex-wrap gap-4 mt-3 text-sm">
              <p className="flex items-center gap-3 text-low-white">
                <Mail className="w-4 h-4" />
                {email}
              </p>
              <p className="flex items-center gap-3 text-low-white">
                <Phone className="w-4 h-4" />
                {phone}
              </p>
            </div>
          </div>
        </div>
        <UpdateBioAndImage
          setCurrentImage={setCurrentImage}
          bio={bio}
          image={currentImage}
          token={token}
        />
      </div>

      <div className="p-2 sm:p-4 border-t border-soft-border flex flex-col gap-2">
        <p className="text-lg font-bold">Biography</p>
        {bio && (
          <p className="text-low-white capitalize text-sm sm:text-base">
            {bio}{" "}
          </p>
        )}
      </div>
    </div>
  );
}
