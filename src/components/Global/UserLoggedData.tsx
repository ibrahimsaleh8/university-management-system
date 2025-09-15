import { SharedUserInfo } from "@/redux/actions/UserInfo";
import { MainDomain } from "@/variables/MainDomain";
import { cookies } from "next/headers";
import { ReactNode } from "react";
import UpdateUserInfoState from "./UpdateUserInfoState";
export default async function UserLoggedData({
  children,
}: {
  children: ReactNode;
}) {
  const cookie = await cookies();
  const token = cookie.get("token")?.value;
  let data: SharedUserInfo = {
    email: "",
    id: 0,
    first_name: "",
    last_name: "",
    role: "",
    image: "",
  };

  if (token) {
    const res = await fetch(`${MainDomain}/api/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["user_data"],
      },
    }).then((res) => res.json());

    data = res;
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
  }

  return <UpdateUserInfoState userInfo={data}>{children}</UpdateUserInfoState>;
}
