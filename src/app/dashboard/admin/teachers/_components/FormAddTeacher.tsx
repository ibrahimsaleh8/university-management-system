"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GenderType } from "@/lib/globalTypes";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { useAddTeacher } from "@/hooks/useAddTeacher";
import { Eye, EyeOff } from "lucide-react";
import SmallLoader from "@/components/Global/SmallLoader";
import InputForm from "@/app/dashboard/_components/forms/InputForm";
import ErrorMessage from "@/app/dashboard/_components/forms/ErrorMessage";
import UploadImage from "@/app/dashboard/_components/forms/UploadImage";
import { Skeleton } from "@/components/ui/skeleton";
type Props = {
  setClose: Dispatch<SetStateAction<boolean>>;
  token: string;
};
export default function FormAddTeacher({ setClose, token }: Props) {
  const {
    HandleForm,
    errors,
    handleSubmit,
    register,
    setValue,
    showPass,
    setShowPass,
    isPending,
    image,
    setImage,
    uploadingImage,
    loadingDepartment,
    departments,
  } = useAddTeacher({ setClose, token });
  return (
    <>
      {/* Form Adding */}
      <form onSubmit={handleSubmit(HandleForm)} className="flex flex-col gap-4">
        {/* Teacher id */}
        <div className="flex gap-2 flex-col sm:flex-row">
          <InputForm
            isError={errors.teacher_id != undefined}
            label="Teacher ID"
            placeholder="ID (14 digits)"
            register={register("teacher_id")}
            type="text"
            inputMode="numeric"
            pattern="\d{14}"
            maxLength={14}
          />
          <UploadImage
            title="Upload Teacher image"
            setImage={setImage}
            image={image}
          />
        </div>

        <ErrorMessage error1={errors.teacher_id} />

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

        {/* Address & Hire date */}
        <div className="flex sm:justify-between w-full gap-4 sm:items-center sm:flex-row flex-col items-start">
          <InputForm
            label="Address"
            placeholder="Address"
            register={register("address")}
            type="text"
            isError={errors.address != undefined}
          />

          {/* Hire Date */}
          <InputForm
            label="Hire Date"
            placeholder="Hire Date"
            register={register("hire_date")}
            type="date"
            classes="sm:w-fit w-full"
            isError={errors.hire_date != undefined}
          />
        </div>
        <ErrorMessage error1={errors.address} error2={errors.hire_date} />

        {/* Phone & Qualification */}
        <div className="flex sm:justify-between w-full gap-4 sm:items-center sm:flex-row flex-col items-start">
          <InputForm
            label="Phone number"
            placeholder="Phone Number"
            register={register("phone")}
            type="text"
            isError={errors.phone != undefined}
          />
          <InputForm
            label="Qualification"
            placeholder="Qualification"
            register={register("qualification")}
            type="text"
            isError={errors.qualification != undefined}
          />
        </div>
        <ErrorMessage error1={errors.qualification} error2={errors.phone} />

        {/* Departments */}
        {loadingDepartment && !departments ? (
          <Skeleton className="h-9 rounded-md w-full" />
        ) : (
          departments && (
            <div className="flex flex-col gap-1 items-start w-full">
              <label htmlFor="class" className="text-sm">
                Department:
              </label>
              <Select
                onValueChange={(e: string) =>
                  setValue("departmentId", parseInt(e))
                }>
                <SelectTrigger
                  id="class"
                  className="w-full bg-Second-black border-soft-border cursor-pointer">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent className="bg-Second-black text-white border-soft-border">
                  {departments.map((depart) => (
                    <SelectItem value={`${depart.id}`} key={depart.id}>
                      {depart.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )
        )}

        <Button
          variant={"mainWithShadow"}
          disabled={isPending || uploadingImage}
          type="submit">
          {isPending ? (
            <div className="flex items-center gap-1">
              Loading....
              <SmallLoader />
            </div>
          ) : uploadingImage ? (
            <div className="flex items-center gap-1">
              Uploading....
              <SmallLoader />
            </div>
          ) : (
            "Add new teacher"
          )}
        </Button>
      </form>
    </>
  );
}
