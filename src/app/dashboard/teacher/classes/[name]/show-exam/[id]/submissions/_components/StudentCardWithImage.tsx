import Image from "next/image";
type Props = {
  imageUrl: string;
  name: string;
  id: string;
};
export default function StudentCardWithImage({ name, id, imageUrl }: Props) {
  return (
    <div className="flex sm:items-start items-center sm:gap-2 gap-0.5">
      <Image
        src={imageUrl}
        alt={`${name} Image`}
        className="object-center object-cover rounded-full sm:w-[45px] sm:h-[45px] w-10 h-10"
        width={45}
        height={45}
      />
      {/* Text */}
      <div className="flex flex-col gap-0.5 text-[11px] pt-1 sm:pt-0 sm:text-sm">
        <p className="font-medium">{name}</p>
        <p className="sm:text-xs text-[10px] text-low-white">{id}</p>
      </div>
    </div>
  );
}
