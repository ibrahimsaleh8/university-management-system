"use client";
import ErrorMessage from "@/app/dashboard/_components/forms/ErrorMessage";
import InputForm from "@/app/dashboard/_components/forms/InputForm";
import SmallLoader from "@/components/Global/SmallLoader";
import { Button } from "@/components/ui/button";
import { RoleType } from "@/lib/globalTypes";
import { Eye, EyeOff, KeyRound } from "lucide-react";
import { FaShieldAlt } from "react-icons/fa";
import { useUpdateUserPassword } from "./Hooks/useUpdateUserPassword";
import { useState } from "react";
type Props = {
  token: string;
  role: RoleType;
};
export default function UpdateUserPasswrod({ token, role }: Props) {
  const { submitNewPassword, isPending, register, handleSubmit, errors } =
    useUpdateUserPassword({ token, role });
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showReNewPass, setShowReNewPass] = useState(false);

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
          <div className="flex items-center gap-1">
            <InputForm
              isError={errors.currentPassword != undefined}
              label="Current Password"
              placeholder="Current Password"
              type={showCurrentPass ? "text" : "password"}
              register={register("currentPassword")}
              className="bg-Second-Card-bg"
            />
            <Button
              className="mt-[25px] bg-Second-Card-bg hover:bg-Second-Card-bg"
              type="button"
              onClick={() => setShowCurrentPass((pre) => !pre)}>
              {showCurrentPass ? <EyeOff /> : <Eye />}
            </Button>
          </div>
          <ErrorMessage error1={errors.currentPassword} />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <InputForm
              isError={errors.newPassword != undefined}
              label="New Password"
              placeholder="New Password"
              type={showNewPass ? "text" : "password"}
              register={register("newPassword")}
              className="bg-Second-Card-bg"
            />
            <Button
              className="mt-[25px] bg-Second-Card-bg hover:bg-Second-Card-bg"
              type="button"
              onClick={() => setShowNewPass((pre) => !pre)}>
              {showNewPass ? <EyeOff /> : <Eye />}
            </Button>
          </div>
          <ErrorMessage error1={errors.newPassword} />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <InputForm
              isError={errors.currentPassword != undefined}
              label="Confirm Password"
              placeholder="Confirm Password"
              type={showReNewPass ? "text" : "password"}
              register={register("reEnterNewPassword")}
              className="bg-Second-Card-bg"
            />
            <Button
              className="mt-[25px] bg-Second-Card-bg hover:bg-Second-Card-bg"
              type="button"
              onClick={() => setShowReNewPass((pre) => !pre)}>
              {showReNewPass ? <EyeOff /> : <Eye />}
            </Button>
          </div>
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
