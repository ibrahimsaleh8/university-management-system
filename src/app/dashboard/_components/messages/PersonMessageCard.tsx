import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Props = {
  image: string;
  name: string;
  lastMessage: string;
  id: string;
  isMsgRead: boolean;
  sender: "you" | "another";
};
export default function PersonMessageCard({
  image,
  lastMessage,
  name,
  id,
  isMsgRead,
  sender,
}: Props) {
  const params = useSearchParams();
  const isActive = id == params.get("chatId");
  return (
    <Link
      href={`?chatId=${id}`}
      className={`flex items-start overflow-hidden relative gap-2 p-2 border-b border-soft-border hover:bg-Main-black cursor-pointer duration-300 ${
        isActive ? "bg-Second-black" : ""
      }`}>
      {!isMsgRead && sender == "another" && (
        <span className="absolute right-1 top-1 block w-2 h-2 bg-red-500 rounded-full"></span>
      )}
      <img
        className="w-10 h-10 object-center object-cover rounded-full"
        src={image}
        alt={`${name}-image`}
      />
      {/* Text */}
      <div className="flex-1 overflow-hidden">
        <p className="font-medium text-sm">{name}</p>
        <p className="text-sm text-low-white line-clamp-1">{lastMessage}</p>
      </div>
    </Link>
  );
}
