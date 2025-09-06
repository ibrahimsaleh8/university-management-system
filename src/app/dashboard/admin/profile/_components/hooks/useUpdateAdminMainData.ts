import { useAppDispatch } from "@/redux/hooks";
import { userSlice } from "@/redux/actions/UserInfo";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";
import { useMutation } from "@tanstack/react-query";
import GlobalToast from "@/components/Global/GlobalToast";
import { ErrorResponseType } from "@/lib/globalTypes";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  UpdateAdminDataSchema,
  UpdateAdminDataType,
} from "@/validation/UpdateAdminDataSchema";
import { AdminMainData } from "../ShowUserInfo";
type Props = {
  adminData: AdminMainData;
  token: string;
};
type returnUpdatedDataType = {
  data: {
    first_name: string;
    email: string;
    last_name: string;
  };
};
async function UpdateAdminDataApi(
  token: string,
  data: UpdateAdminDataType
): Promise<returnUpdatedDataType> {
  const res = await axios.patch(
    `${MainDomain}/api/update/profile/admin`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}
export const useUpdateAdminMainData = ({ adminData, token }: Props) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UpdateAdminDataType>({
    resolver: zodResolver(UpdateAdminDataSchema),
    mode: "onSubmit",
    defaultValues: {
      email: adminData.email,
      first_name: adminData.first_name,
      last_name: adminData.last_name,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (updateParams: { token: string; data: UpdateAdminDataType }) =>
      UpdateAdminDataApi(updateParams.token, updateParams.data),
    onSuccess: ({ data }: returnUpdatedDataType) => {
      GlobalToast({
        icon: "success",
        title: "admin data has been updated success",
      });
      setValue("password", "");
      dispatch(userSlice.actions.updateMainData({ ...data }));
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({
        title: err.response.data.message,
        icon: "error",
      });
    },
  });
  const submitNewAdminData: SubmitHandler<UpdateAdminDataType> = (data) => {
    mutate({
      data,
      token,
    });
  };

  return {
    submitNewAdminData,
    isPending,
    register,
    handleSubmit,
    errors,
  };
};
