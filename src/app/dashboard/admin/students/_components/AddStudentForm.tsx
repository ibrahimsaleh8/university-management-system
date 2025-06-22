"use client";
import ErrorMessage from "@/app/dashboard/_components/forms/ErrorMessage";
import InputForm from "@/app/dashboard/_components/forms/InputForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GenderType } from "@/lib/globalTypes";
import { Dispatch, SetStateAction } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import SmallLoader from "@/components/Global/SmallLoader";
import { Skeleton } from "@/components/ui/skeleton";
import { useAddStudent } from "@/hooks/useAddStudent";
type Props = {
  setClose: Dispatch<SetStateAction<boolean>>;
  token: string;
};

export default function AddStudentForm({ token, setClose }: Props) {
  const {
    classes,
    errors,
    handleStudentFormSubmit,
    handleSubmit,
    isLoading,
    isPending,
    register,
    setShowPass,
    setValue,
    showPass,
  } = useAddStudent({ token, setClose });

  return (
    <form
      onSubmit={handleSubmit(handleStudentFormSubmit)}
      className="flex flex-col gap-4">
      {/* Student Id */}
      <InputForm
        isError={errors.student_id != undefined}
        label="Student ID"
        placeholder="ID (14 digits)"
        register={register("student_id")}
        type="text"
        inputMode="numeric"
        pattern="\d{14}"
        maxLength={14}
      />
      <ErrorMessage error1={errors.student_id} />

      {/* Name */}
      <div className="flex sm:justify-between w-full gap-4 sm:items-center sm:flex-row flex-col items-start">
        <InputForm
          isError={errors.first_name != undefined}
          label="First name"
          placeholder="First Name"
          register={register("first_name")}
          type="text"
        />
        <InputForm
          isError={errors.last_name != undefined}
          label="Last name"
          placeholder="Last Name"
          register={register("last_name")}
          type="text"
        />
      </div>
      <ErrorMessage error1={errors.first_name} error2={errors.last_name} />

      {/* Email & Gender */}
      <div className="flex items-center justify-between gap-3">
        <InputForm
          isError={errors.email != undefined}
          label="Email"
          placeholder="Email"
          register={register("email")}
          type="email"
        />

        {/* Gender */}
        <div className="flex flex-col gap-1 items-start">
          <label htmlFor="gender" className="text-sm">
            Gender:
          </label>
          <Select onValueChange={(e: GenderType) => setValue("gender", e)}>
            <SelectTrigger
              id="gender"
              className="w-28 bg-Second-black border-soft-border cursor-pointer">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent className="bg-Second-black text-white border-soft-border">
              <SelectItem value="MALE">Male</SelectItem>
              <SelectItem value="FEMALE">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <ErrorMessage error1={errors.email} error2={errors.gender} />

      {/* Password & Date of birth */}
      <div className="flex sm:justify-between w-full gap-4 sm:items-center sm:flex-row flex-col items-start">
        <div className="relative w-full">
          <InputForm
            isError={errors.password != undefined}
            label="Password"
            placeholder="Password"
            register={register("password")}
            type={showPass ? "text" : "password"}
          />
          <button
            type="button"
            onClick={() => setShowPass((pre) => !pre)}
            className="absolute right-2 top-[69%] -translate-y-1/2 bg-Second-black">
            {showPass ? (
              <EyeOff className="cursor-pointer" />
            ) : (
              <Eye className="cursor-pointer" />
            )}
          </button>
        </div>

        {/* Date of birth */}
        <InputForm
          label="Date of birth"
          placeholder="Date of birth"
          register={register("date_of_birth")}
          type="date"
          classes="sm:w-fit w-full"
          isError={errors.date_of_birth != undefined}
        />
      </div>
      <ErrorMessage error1={errors.password} error2={errors.date_of_birth} />

      {/* Address & Phone Number */}
      <div className="flex sm:justify-between w-full gap-4 sm:items-center sm:flex-row flex-col items-start">
        <InputForm
          label="Address"
          placeholder="Address"
          register={register("address")}
          type="text"
          isError={errors.address != undefined}
        />

        {/* Phone Number */}
        <InputForm
          label="Phone number"
          placeholder="Phone Number"
          register={register("phone")}
          type="text"
          isError={errors.phone != undefined}
        />
      </div>
      <ErrorMessage error1={errors.address} error2={errors.phone} />

      {/* Classes */}
      {isLoading && !classes ? (
        <>
          <Skeleton className="h-9 rounded-md w-full" />
        </>
      ) : (
        classes && (
          <div className="flex flex-col gap-1 items-start">
            <label htmlFor="class" className="text-sm">
              Class:
            </label>
            <Select
              onValueChange={(e: string) => setValue("classId", parseInt(e))}>
              <SelectTrigger
                id="class"
                className="w-full bg-Second-black border-soft-border cursor-pointer">
                <SelectValue placeholder="Classes" />
              </SelectTrigger>
              <SelectContent className="bg-Second-black text-white border-soft-border">
                {classes.map((stdClass) => (
                  <SelectItem value={stdClass.id.toString()} key={stdClass.id}>
                    {stdClass.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )
      )}
      <ErrorMessage error1={errors.classId} />

      <Button
        disabled={isPending}
        type="submit"
        className="bg-main-text hover:bg-main-text capitalize hover:text-black text-black">
        {isPending ? (
          <div className="flex items-center gap-1">
            Adding....
            <SmallLoader />
          </div>
        ) : (
          "Add New Student"
        )}
      </Button>
    </form>
  );
}
