"use client";
import ErrorMessage from "@/app/dashboard/_components/forms/ErrorMessage";
import InputForm from "@/app/dashboard/_components/forms/InputForm";
import SmallLoader from "@/components/Global/SmallLoader";
import { Button } from "@/components/ui/button";
import { RoleType } from "@/lib/globalTypes";
import { KeyRound } from "lucide-react";
import { FaShieldAlt } from "react-icons/fa";
import { useUpdateUserPassword } from "./Hooks/useUpdateUserPassword";
type Props = {
  token: string;
  role: RoleType;
};
export default function UpdateUserPasswrod({ token, role }: Props) {
  const { submitNewPassword, isPending, register, handleSubmit, errors } =
    useUpdateUserPassword({ token, role });
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
      <div className="flex flex-col gap-1 text-low-white text-sm mt-auto">
        <p className="font-medium">🔒 Tips to create a strong password</p>
        <ul className="list-disc list-inside ">
          <li>At least 8 characters</li>
          <li>Mix letters, numbers & symbols</li>
          <li>Avoid common words or sequences</li>
        </ul>
      </div>
    </div>
  );
}
