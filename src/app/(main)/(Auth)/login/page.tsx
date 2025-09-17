"use client";
import SmallLoader from "@/components/Global/SmallLoader";
import { Button } from "@/components/ui/button";
import useLoginApiRequest from "@/hooks/useLoginApiRequest";
import { LoginSchema } from "@/validation/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
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

import loginImage from "@images/Young Man in Workshop.png";
import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";

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
    mode: "onSubmit",
    resolver: zodResolver(LoginSchema),
  });

  const { mutate, isPending } = useLoginApiRequest();
  const submitHandler: SubmitHandler<Inputs> = (data) => {
    mutate(data);
  };

  const [showPass, setShowPass] = useState(false);

  return (
    <div
      className="flex gap-3 pt-3 px-2 overflow-x-hidden"
      style={{ height: "calc(100vh - 100px)" }}>
      {/* Form Animation */}
      <motion.form
        onSubmit={handleSubmit(submitHandler)}
        className="h-full lg:w-1/2 w-full mx-auto flex gap-5 flex-col p-4 pt-28 relative"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}>
        <div className="flex flex-col gap-1">
          <motion.p
            className="text-2xl font-bold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}>
            Welcome back!
          </motion.p>
          <motion.p
            className="text-low-white"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}>
            Please enter your Details to login
          </motion.p>
        </div>

        <div className="flex gap-2 items-center flex-col sm:flex-row">
          {/* Email */}
          <InputForm
            isError={errors.email != undefined}
            label="Email"
            placeholder="Email"
            register={register("email")}
            type="email"
          />

          {/* Role */}
          <div className="flex flex-col gap-1 w-full sm:w-fit">
            <label className="text-sm font-bold" htmlFor="role">
              Role:
            </label>
            <Select onValueChange={(e) => setValue("role", e)}>
              <SelectTrigger
                id="role"
                className="sm:w-[140px] w-full text-left cursor-pointer h-10 bg-Second-black border-soft-border ">
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

        <div className="flex items-center gap-4 flex-wrap justify-between">
          <div>
            <Button
              variant={"mainWithShadow"}
              className="w-48"
              disabled={isPending}>
              {isPending ? (
                <div className="flex items-center gap-1">
                  <SmallLoader />
                  Loading...
                </div>
              ) : (
                "Login"
              )}
            </Button>
          </div>
          <Link href={"/forgot-password"}>Forgot Password?</Link>
        </div>
      </motion.form>

      {/* Right Image Animation */}
      <motion.div
        className="hidden lg:flex w-fit h-full rounded-2xl overflow-hidden auth-image"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}>
        <Image
          src={loginImage}
          alt="Login Image"
          width={1000}
          height={1000}
          className="w-full h-full object-contain rounded-2xl object-top "
        />
      </motion.div>
    </div>
  );
}
