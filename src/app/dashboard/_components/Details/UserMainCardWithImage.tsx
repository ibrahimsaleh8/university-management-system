import Image from "next/image";
import { ReactNode } from "react";

type Props = {
  image: string;
  name: string;
  id: string;
  operations: ReactNode;
};
export default function UserMainCardWithImage({
  name,
  id,
  image,
  operations,
}: Props) {
  return (
    <div className="bg-Second-black rounded-2xl lg:w-80 w-full pb-10 flex flex-col gap-5 items-center p-2">
      <div className="bg-soft-border w-fit rounded-full p-0.5">
        <Image
          src={image}
          alt={name}
          width={1000}
          height={1000}
          className="w-32 h-32 rounded-full"
        />
      </div>
      {/* Text */}
      <div className="flex flex-col gap-1 text-center">
        <p className="text-lg font-bold capitalize">{name}</p>

        <p className="text-xs text-main-text font-medium">ID: {id}</p>
      </div>

      {/* Operations */}
      {operations}
    </div>
  );
}
