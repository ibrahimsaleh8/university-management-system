import ShowUserImageProfile from "@/app/dashboard/_components/profile/ShowUserImageProfile";
import { Mail, Star } from "lucide-react";
type Props = {
  token: string;
  image: string;
  first_name: string;
  last_name: string;
  email: string;
};
export default function AdminTopProfile({
  email,
  first_name,
  image,
  last_name,
  token,
}: Props) {
  return (
    <div className="p-4 bg-main-dark border border-soft-border rounded-2xl flex items-center gap-5 flex-wrap">
      <ShowUserImageProfile role="admin" token={token} userImage={image} />

      <div className="flex flex-col gap-1">
        <h1 className="sm:text-2xl text-xl font-bold capitalize">
          {first_name} {last_name}
        </h1>
        <p className="flex items-center gap-2 text-sm text-low-white">
          <Mail className="w-4 h-4" />
          {email}
        </p>
        <p className="capitalize text-sm text-main-text flex items-center gap-2">
          <Star className="w-4 h-4" />
          admin of system
        </p>
      </div>
    </div>
  );
}
