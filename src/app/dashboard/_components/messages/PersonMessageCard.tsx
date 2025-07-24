import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Props = {
  image: string;
  name: string;
  lastMessage: string;
  id: string;
  isMsgRead: boolean;
};
export default function PersonMessageCard({
  image,
  lastMessage,
  name,
  id,
  isMsgRead,
}: Props) {
  const params = useSearchParams();
  const isActive = id == params.get("chatId");
  return (
    <Link
      href={`?chatId=${id}`}
      className={`flex items-start relative gap-2 p-2 border-b border-soft-border hover:bg-Main-black cursor-pointer duration-300 ${
        isActive ? "bg-Second-black" : ""
      }`}>
      {!isMsgRead && (
        <span className="absolute right-1 top-1 block w-2 h-2 bg-red-500 rounded-full"></span>
      )}
      <img
        className="w-10 h-10 object-center object-cover rounded-full"
        src={image}
        alt={`${name}-image`}
      />
      {/* Text */}
      <div>
        <p className="font-medium text-sm">{name}</p>

        <p className="text-sm text-low-white line-clamp-1 flex items-center justify-between">
          {lastMessage}
        </p>
      </div>
    </Link>
  );
}
