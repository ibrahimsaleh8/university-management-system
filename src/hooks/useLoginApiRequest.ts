import GlobalToast from "@/components/Global/GlobalToast";
import { ErrorResponseType } from "@/lib/globalTypes";
import { SharedUserInfo, userSlice } from "@/redux/actions/UserInfo";
import { useAppDispatch } from "@/redux/hooks";
import { MainDomain } from "@/variables/MainDomain";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
export type LoginDataType = {
  email: string;
  password: string;
  role: string;
};

async function LoginRequest(data: LoginDataType): Promise<SharedUserInfo> {
  const res = await axios.post(`${MainDomain}/api/auth/login`, data);
  return res.data;
}
export default function useLoginApiRequest() {
  const dispatch = useAppDispatch();
  const route = useRouter();

  const loginMutateRequest = useMutation({
    mutationFn: (data: LoginDataType) => LoginRequest(data),
    onSuccess: (res: SharedUserInfo) => {
      GlobalToast({ title: "Logged in success", icon: "success" });
      dispatch(userSlice.actions.setAuthStatus({ isLoggedin: true }));
      dispatch(userSlice.actions.updateUserState({ ...res }));
      route.refresh();
      route.replace("/");
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({ title: err.response.data.message, icon: "error" });
    },
  });

  return loginMutateRequest;
}
