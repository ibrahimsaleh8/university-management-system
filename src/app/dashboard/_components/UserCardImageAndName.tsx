import Image from "next/image";

type Props = {
  name: string;
  image: string;
};
export default function UserCardImageAndName({ image, name }: Props) {
  return (
    <div className="flex gap-2 items-center">
      <Image
        src={image}
        alt={`image ${name}`}
        className="!object-cover !object-center rounded-full !w-[40px] !h-[40px]"
        width={100}
        height={100}
      />
      {/* Text */}
      <div className="flex flex-col items-start gap-0.5 sm:text-sm text-xs">
        <p className="font-medium line-clamp-1">{name}</p>
      </div>
    </div>
  );
}
