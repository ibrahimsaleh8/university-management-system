"use client";
import SmallLoader from "@/components/Global/SmallLoader";
import { Button } from "@/components/ui/button";
import useLoginApiRequest from "@/hooks/useLoginApiRequest";
import { LoginSchema } from "@/validation/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, ShieldUser } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InputForm from "@/app/dashboard/_components/forms/InputForm";
import ErrorMessage from "@/app/dashboard/_components/forms/ErrorMessage";

type Inputs = {
  email: string;
  password: string;
  role: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>({
    mode: "all",
    resolver: zodResolver(LoginSchema),
  });
  const { mutate, isPending } = useLoginApiRequest();
  const submitHandler: SubmitHandler<Inputs> = (data) => {
    mutate(data);
  };

  const [showPass, setShowPass] = useState(false);
  return (
    <div className="py-4 pt-10 sm:px-3 w-full flex items-center justify-center flex-col">
      <p className="flex items-center gap-1 text-2xl font-bold">
        <ShieldUser />
        Login
      </p>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="md:w-1/2 w-full p-2 flex gap-5 flex-col">
        <div className="flex gap-2 items-center">
          {/* Email */}
          <InputForm
            isError={errors.email != undefined}
            label="Email"
            placeholder="Email"
            register={register("email")}
            type="email"
          />

          {/* Role */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold" htmlFor="role">
              Role:
            </label>
            <Select onValueChange={(e) => setValue("role", e)}>
              <SelectTrigger
                id="role"
                className="w-[140px] cursor-pointer h-10 bg-Second-black border-soft-border ">
                <SelectValue placeholder="User Role" />
              </SelectTrigger>
              <SelectContent className="bg-Second-black text-white border-soft-border">
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="teacher">Teacher</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <ErrorMessage error1={errors.email} error2={errors.role} />

        <div className="flex flex-col gap-1">
          <div className="flex gap-1 items-center">
            <InputForm
              isError={errors.password != undefined}
              label="Password"
              placeholder="Password"
              register={register("password")}
              type={showPass ? "text" : "password"}
            />
            <Button
              type="button"
              onClick={() => setShowPass((pre) => !pre)}
              className="bg-Second-black h-10 w-10 cursor-pointer flex items-center justify-center rounded-md mt-7">
              {showPass ? (
                <EyeOff className="!w-5 !h-5" />
              ) : (
                <Eye className="!w-5 !h-5" />
              )}
            </Button>
          </div>
        </div>
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}

        <Button variant={"mainWithShadow"} disabled={isPending}>
          {isPending ? (
            <div className="flex items-center gap-1">
              <SmallLoader />
              Loading...
            </div>
          ) : (
            "Login"
          )}
        </Button>
        <div className="flex items-center flex-wrap justify-between text-sm gap-3 sm:text-base">
          <Link href={"/forgot-password"}>Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
}
