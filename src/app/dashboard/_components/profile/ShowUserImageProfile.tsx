"use client";

import Image from "next/image";
import { RoleType } from "@/lib/globalTypes";
import { useState } from "react";
import UserImageModel from "./UserImageModel";

type Props = {
  userImage: string;
  token: string;
  role: RoleType;
};
export default function ShowUserImageProfile({
  userImage,
  token,
  role,
}: Props) {
  const [defaultImage, setDefaultImage] = useState(userImage);
  return (
    <div className="relative w-fit">
      <Image
        alt="Student image"
        src={defaultImage}
        width={1000}
        height={1000}
        className="w-28 h-28 rounded-full object-cover object-center"
      />
      <div className="absolute right-[-2px] bottom-[-2px]">
        <UserImageModel
          setDefaultImage={setDefaultImage}
          role={role}
          token={token}
          userImage={defaultImage}
        />
      </div>
    </div>
  );
}
