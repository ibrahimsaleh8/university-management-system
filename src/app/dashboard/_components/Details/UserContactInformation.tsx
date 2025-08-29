import { Contact, Mail, MapPin, Phone } from "lucide-react";
import UserContactInfo from "./UserContactInfo";

type Props = {
  email: string;
  phone: string;
  address: string;
};
export default function UserContactInformation({
  address,
  email,
  phone,
}: Props) {
  return (
    <div className="bg-Second-black rounded-2xl lg:w-80 w-full pb-10 flex flex-col gap-5 p-5">
      <p className="flex items-center gap-1.5 font-bold">
        <Contact className="w-5 h-5 text-main-text" />
        Contact Information
      </p>

      <div className="flex flex-col gap-4 items-start">
        <UserContactInfo
          header="Email"
          icon={<Mail className="w-4 h-4" />}
          value={email}
        />
        <UserContactInfo
          header="Phone"
          icon={<Phone className="w-4 h-4" />}
          value={phone}
        />
        <UserContactInfo
          header="Address"
          icon={<MapPin className="w-4 h-4" />}
          value={address}
        />
      </div>
    </div>
  );
}
