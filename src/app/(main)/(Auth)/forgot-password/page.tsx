"use client";

import ErrorMessage from "@/app/dashboard/_components/forms/ErrorMessage";
import InputForm from "@/app/dashboard/_components/forms/InputForm";
import GlobalToast from "@/components/Global/GlobalToast";
import SmallLoader from "@/components/Global/SmallLoader";
import { Button } from "@/components/ui/button";
import { ErrorResponseType } from "@/lib/globalTypes";
import {
  ForgotPasswordDataType,
  ForgotPasswordSchema,
} from "@/validation/ForgotPasswordSchema";
import { MainDomain } from "@/variables/MainDomain";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
async function forgotPasswordApi(data: ForgotPasswordDataType) {
  await axios.post(`${MainDomain}/api/auth/forgot-password`, data);
}
export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordDataType>({
    resolver: zodResolver(ForgotPasswordSchema),
    mode: "onSubmit",
  });
  const { mutate, isPending } = useMutation({
    mutationFn: (data: ForgotPasswordDataType) => forgotPasswordApi(data),
    onSuccess: () => {
      GlobalToast({
        icon: "success",
        title: "Reset password link has been sent to your email",
      });
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({
        title: err.response.data.message,
        icon: "error",
      });
    },
  });
  const submitForgotPass: SubmitHandler<ForgotPasswordDataType> = (data) => {
    mutate(data);
  };

  return (
    <div className=" w-full relative">
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
        <h1 className="text-2xl font-bold">Forgot Password</h1>

        <form
          onSubmit={handleSubmit(submitForgotPass)}
          className="flex flex-col items-center gap-3 w-1/2 p-4 ">
          <div className="w-full flex flex-col gap-1">
            <InputForm
              isError={errors.user_id != undefined}
              label="ID"
              placeholder="ID (14 digits)"
              register={register("user_id")}
              type="text"
              inputMode="numeric"
              pattern="\d{14}"
              maxLength={14}
            />
            <ErrorMessage error1={errors.user_id} />
          </div>
          <div className="w-full flex flex-col gap-1">
            <InputForm
              isError={errors.email != undefined}
              label="Email"
              placeholder="Your Email"
              type="email"
              register={register("email")}
            />
            <ErrorMessage error1={errors.email} />
          </div>

          <Button
            type="submit"
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
