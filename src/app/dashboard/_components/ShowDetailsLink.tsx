import { Eye } from "lucide-react";
import Link from "next/link";

type Props = {
  url: string;
};
export default function ShowDetailsLink({ url }: Props) {
  return (
    <Link
      href={url}
      className="bg-white hover:bg-transparent border border-white hover:text-white duration-300 flex items-center justify-center rounded-md w-10 h-8 text-black">
      <Eye className="w-4 h-4" />
    </Link>
  );
}
