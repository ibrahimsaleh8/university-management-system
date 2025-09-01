import Image from "next/image";
type Props = {
  name: string;
  email: string;
  image: string;
};
export default function UserCardWithNameAndEmail({
  image,
  name,
  email,
}: Props) {
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
      <div className="flex flex-col items-start gap-0.5 text-sm">
        <p className="font-medium">{name}</p>
        <p
          title={email}
          className="text-xs text-low-white max-w-40 overflow-clip">
          {email}
        </p>
      </div>
    </div>
  );
}
