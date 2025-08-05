"use client";

import { SharedUserInfo, userSlice } from "@/redux/actions/UserInfo";
import { useAppDispatch } from "@/redux/hooks";
import { ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
  userInfo: SharedUserInfo;
};
export default function UpdateUserInfoState({ children, userInfo }: Props) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (userInfo.id != 0 && userInfo.email.length > 0) {
      dispatch(userSlice.actions.updateUserState({ ...userInfo }));
      dispatch(userSlice.actions.setAuthStatus({ isLoggedin: true }));
    }
  }, [dispatch, userInfo]);

  return <>{children}</>;
}
