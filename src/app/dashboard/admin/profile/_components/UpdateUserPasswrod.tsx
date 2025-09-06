"use client";
import ErrorMessage from "@/app/dashboard/_components/forms/ErrorMessage";
import InputForm from "@/app/dashboard/_components/forms/InputForm";
import GlobalToast from "@/components/Global/GlobalToast";
import SmallLoader from "@/components/Global/SmallLoader";
import { Button } from "@/components/ui/button";
import { ErrorResponseType } from "@/lib/globalTypes";
import {
  UpdatePasswordDataType,
  UpdatePasswordSchema,
} from "@/validation/UpdatePasswordSchema";
import { MainDomain } from "@/variables/MainDomain";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { KeyRound } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaShieldAlt } from "react-icons/fa";
async function updateAdminPassword(
  token: string,
  parse: UpdatePasswordDataType
) {
  await axios.patch(
    `${MainDomain}/api/update/profile/admin/admin-password`,
    parse,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
export default function UpdateUserPasswrod({ token }: { token: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdatePasswordDataType>({
    resolver: zodResolver(UpdatePasswordSchema),
    mode: "onSubmit",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (updateParams: {
      token: string;
      parse: UpdatePasswordDataType;
    }) => updateAdminPassword(updateParams.token, updateParams.parse),
    onSuccess: () => {
      GlobalToast({
        icon: "success",
        title: "Password updated success",
      });
      reset({
        currentPassword: "",
        newPassword: "",
        reEnterNewPassword: "",
      });
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({
        title: err.response.data.message,
        icon: "error",
      });
    },
  });

  const submitNewPassword: SubmitHandler<UpdatePasswordDataType> = (data) => {
    mutate({ parse: data, token });
  };

  return (
    <div className="w-full bg-Second-black p-4 flex flex-col gap-5 rounded-2xl">
      <p className="font-bold text-main-text flex items-center gap-1 capitalize">
        <FaShieldAlt className="w-5 h-5" />
        password managment
      </p>

      <form
        className="flex flex-col gap-4 h-full"
        onSubmit={handleSubmit(submitNewPassword)}>
        <div className="flex flex-col gap-1">
          <InputForm
            isError={errors.currentPassword != undefined}
            label="Current Password"
            placeholder="Current Password"
            type="password"
            register={register("currentPassword")}
            className="bg-Second-Card-bg"
          />
          <ErrorMessage error1={errors.currentPassword} />
        </div>

        <div className="flex flex-col gap-1">
          <InputForm
            isError={errors.newPassword != undefined}
            label="New Password"
            placeholder="New Password"
            type="password"
            register={register("newPassword")}
            className="bg-Second-Card-bg"
          />
          <ErrorMessage error1={errors.newPassword} />
        </div>

        <div className="flex flex-col gap-1">
          <InputForm
            isError={errors.currentPassword != undefined}
            label="Confirm Password"
            placeholder="Confirm Password"
            type="password"
            register={register("reEnterNewPassword")}
            className="bg-Second-Card-bg"
          />
          <ErrorMessage error1={errors.reEnterNewPassword} />
        </div>

        <Button
          disabled={isPending}
          className="w-48"
          variant={"mainWithShadow"}>
          {isPending ? (
            <>
              Updateing... <SmallLoader />
            </>
          ) : (
            <>
              <KeyRound />
              Update Password
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
