"use client";
import { UpdateAdminDataType } from "@/validation/UpdateAdminDataSchema";
import InputForm from "@/app/dashboard/_components/forms/InputForm";
import { Button } from "@/components/ui/button";
import ErrorMessage from "@/app/dashboard/_components/forms/ErrorMessage";
import SmallLoader from "@/components/Global/SmallLoader";
import { UserRoundCog } from "lucide-react";
import { useUpdateAdminMainData } from "./hooks/useUpdateAdminMainData";
type Props = {
  adminData: AdminMainData;
  token: string;
};
export type AdminMainData = Omit<UpdateAdminDataType, "password">;

export default function ShowUserInfo({ adminData, token }: Props) {
  const { submitNewAdminData, isPending, register, handleSubmit, errors } =
    useUpdateAdminMainData({ adminData, token });

  return (
    <div className="flex flex-col gap-4 w-full bg-Second-black rounded-2xl p-4 h-fit pb-8">
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
