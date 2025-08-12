import Image from "next/image";
type Props = {
  imageUrl: string;
  name: string;
  id: string;
};
export default function StudentCardWithImage({ name, id, imageUrl }: Props) {
  return (
    <div className="flex items-start gap-2">
      <Image
        src={imageUrl}
        alt={`${name} Image`}
        className="object-center object-cover rounded-full"
        width={45}
        height={45}
      />
      {/* Text */}
      <div className="flex flex-col gap-0.5 text-sm">
        <p className="font-medium">{name}</p>
        <p className="text-xs text-low-white">{id}</p>
      </div>
    </div>
  );
}
