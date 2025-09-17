"use client";

import ErrorMessage from "@/app/dashboard/_components/forms/ErrorMessage";
import InputForm from "@/app/dashboard/_components/forms/InputForm";
import GlobalToast from "@/components/Global/GlobalToast";
import SmallLoader from "@/components/Global/SmallLoader";
import { Button } from "@/components/ui/button";
import { ErrorResponseType } from "@/lib/globalTypes";
import {
  ResetPasswordDataType,
  ResetPasswordSchema,
} from "@/validation/ResetPassword";
import { MainDomain } from "@/variables/MainDomain";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

async function resetPasswordApi(data: {
  resetData: ResetPasswordDataType;
  token: string;
}) {
  await axios.patch(`${MainDomain}/api/auth/reset-password`, data);
}

export default function ResetPassword() {
  const params = useSearchParams();
  const route = useRouter();
  const [showPssword, setShowPassword] = useState(false);
  const [showConfirmPssword, setShowConfirmPssword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordDataType>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: "onSubmit",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: { resetData: ResetPasswordDataType; token: string }) =>
      resetPasswordApi(data),
    onSuccess: () => {
      GlobalToast({
        icon: "success",
        title: "Password has been updated success",
      });
      route.replace("/login");
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({
        title: err.response.data.message,
        icon: "error",
      });
    },
  });

  const submitForgotPass: SubmitHandler<ResetPasswordDataType> = (data) => {
    const token = params.get("token");
    if (!token) {
      GlobalToast({
        icon: "error",
        title: "No token exist",
      });
      return;
    }
    mutate({ resetData: data, token });
  };
  useEffect(() => {
    if (!params.get("token")) {
      route.replace("/");
    }
  }, [params, route]);
  return (
    <div className="w-full relative">
      {/* Dark Dot Matrix */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: "#0f0f0f",
          backgroundImage: `
       radial-gradient(circle at 25% 25%, #222222 0.5px, transparent 1px),
       radial-gradient(circle at 75% 75%, #111111 0.5px, transparent 1px)
     `,
          backgroundSize: "10px 10px",
          imageRendering: "pixelated",
        }}
      />
      <div className="flex flex-col gap-4 items-center justify-center sm:p-10 p-3 relative">
        <h1 className="text-2xl font-bold">Reset Password</h1>

        <form
          onSubmit={handleSubmit(submitForgotPass)}
          className="flex flex-col items-center gap-3 w-1/2 p-4 ">
          <div className="w-full flex flex-col gap-1">
            <div className="flex items-end gap-1">
              <InputForm
                isError={errors.password != undefined}
                label="Password"
                placeholder="New Password"
                type={showPssword ? "text" : "password"}
                register={register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((pre) => !pre)}
                className="w-10 h-10 flex items-center cursor-pointer text-low-white justify-center bg-Second-black rounded-md">
                {!showPssword ? (
                  <Eye className="w-5 h-5 " />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
              </button>
            </div>
            <ErrorMessage error1={errors.password} />
          </div>
          <div className="w-full flex flex-col gap-1">
            <div className="flex items-end gap-1">
              <InputForm
                isError={errors.confirmPassword != undefined}
                label="Confirm Password"
                placeholder="Confirm New Password"
                type={showConfirmPssword ? "text" : "password"}
                register={register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPssword((pre) => !pre)}
                className="w-10 h-10 flex items-center cursor-pointer text-low-white justify-center bg-Second-black rounded-md">
                {!showConfirmPssword ? (
                  <Eye className="w-5 h-5 " />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
              </button>
            </div>
            <ErrorMessage error1={errors.confirmPassword} />
          </div>

          <Button
            disabled={isPending}
            className="w-36 mr-auto"
            variant={"mainWithShadow"}>
            {isPending ? <SmallLoader /> : "Reset"}
          </Button>
        </form>
      </div>
    </div>
  );
}
