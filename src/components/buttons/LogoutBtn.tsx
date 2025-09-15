import { Button } from "@/components/ui/button";
import { MainDomain } from "@/variables/MainDomain";
import axios, { AxiosError } from "axios";
import GlobalToast from "../Global/GlobalToast";
import { useAppDispatch } from "@/redux/hooks";
import { userSlice } from "@/redux/actions/UserInfo";
import { ErrorResponseType } from "@/lib/globalTypes";
async function LogoutRequest(): Promise<{ message: string }> {
  try {
    const res = await axios.get(`${MainDomain}/api/auth/logout`);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
}
export default function LogoutBtn() {
  const dispatch = useAppDispatch();
  const HandleLogout = async () => {
    await LogoutRequest()
      .then(() => {
        dispatch(userSlice.actions.setAuthStatus({ isLoggedin: false }));
        dispatch(userSlice.actions.LogoutAction());
      })
      .catch((err: ErrorResponseType) => {
        GlobalToast({ icon: "success", title: err.response.data.message });
      });
  };
  return (
    <Button onClick={HandleLogout} variant="destructive">
      Logout
    </Button>
  );
}
