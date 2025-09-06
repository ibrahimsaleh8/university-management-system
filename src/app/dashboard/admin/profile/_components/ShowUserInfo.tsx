"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  UpdateAdminDataSchema,
  UpdateAdminDataType,
} from "@/validation/UpdateAdminDataSchema";
import InputForm from "@/app/dashboard/_components/forms/InputForm";
import { Button } from "@/components/ui/button";
import ErrorMessage from "@/app/dashboard/_components/forms/ErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";
import { useMutation } from "@tanstack/react-query";
import GlobalToast from "@/components/Global/GlobalToast";
import { ErrorResponseType } from "@/lib/globalTypes";
import SmallLoader from "@/components/Global/SmallLoader";
import { useAppDispatch } from "@/redux/hooks";
import { userSlice } from "@/redux/actions/UserInfo";
import { UserRoundCog } from "lucide-react";
type returnUpdatedDataType = {
  data: {
    first_name: string;
    email: string;
    last_name: string;
  };
};
export type AdminMainData = Omit<UpdateAdminDataType, "password">;
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

export default function ShowUserInfo({
  adminData,
  token,
}: {
  adminData: AdminMainData;
  token: string;
}) {
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

    console.log(data);
  };

  return (
    <div className="flex flex-col gap-4 w-full bg-Second-black rounded-2xl p-4">
      <p className="font-bold text-main-text flex items-center gap-1">
        <UserRoundCog className="w-5 h-5" />
        User Data
      </p>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(submitNewAdminData)}>
        <div className="flex flex-col gap-1">
          <InputForm
            isError={errors.first_name != undefined}
            label="First Name"
            placeholder="First Name"
            type="text"
            register={register("first_name")}
            className="bg-Second-Card-bg"
          />
          <ErrorMessage error1={errors.first_name} />
        </div>

        <div className="flex flex-col gap-1">
          <InputForm
            isError={errors.last_name != undefined}
            label="Last Name"
            placeholder="Last Name"
            className="bg-Second-Card-bg"
            type="text"
            register={register("last_name")}
          />
          <ErrorMessage error1={errors.last_name} />
        </div>

        <div className="flex flex-col gap-1">
          <InputForm
            isError={errors.email != undefined}
            label="Email"
            className="bg-Second-Card-bg"
            placeholder="Email"
            type="email"
            register={register("email")}
          />
          <ErrorMessage error1={errors.email} />
        </div>

        <div className="flex flex-col gap-1">
          <InputForm
            isError={errors.password != undefined}
            label="Current Password"
            className="bg-Second-Card-bg"
            placeholder="Password"
            type="password"
            register={register("password")}
          />
          <ErrorMessage error1={errors.password} />
        </div>

        <Button
          disabled={isPending}
          className="w-32"
          variant={"mainWithShadow"}>
          {isPending ? <SmallLoader /> : "Update"}
        </Button>
      </form>
    </div>
  );
}
