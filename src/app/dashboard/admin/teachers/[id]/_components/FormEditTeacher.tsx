import ErrorMessage from "@/app/dashboard/_components/forms/ErrorMessage";
import InputForm from "@/app/dashboard/_components/forms/InputForm";
import UploadImage from "@/app/dashboard/_components/forms/UploadImage";
import SmallLoader from "@/components/Global/SmallLoader";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useEditTeacher } from "@/hooks/useEditTeacher";
import { formatDeadline } from "@/lib/FormatDeadline";
import { GenderType } from "@/lib/globalTypes";
import { EditTeacherDataType } from "@/validation/EditTeacherSchema";
import { Dispatch, SetStateAction } from "react";

type Props = {
  token: string;
  teacherData: EditTeacherDataType & { image: string };
  setIsClose: Dispatch<SetStateAction<boolean>>;
};
export default function FormEditTeacher({
  teacherData,
  token,
  setIsClose,
}: Props) {
  const {
    errors,
    getValues,
    handleSubmit,
    register,
    setImage,
    setValue,
    submitEditTeacher,
    uploadingImage,
    image,
    isPending,
  } = useEditTeacher({ teacherData, token, setIsClose });
  return (
    <>
      {/* Form Adding */}
      <form
        onSubmit={handleSubmit(submitEditTeacher)}
        className="flex flex-col gap-4">
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
            disabled={true}
          />
          <UploadImage
            imageurl={teacherData.image}
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
            <Select
              defaultValue={getValues("gender")}
              onValueChange={(e: GenderType) => setValue("gender", e)}>
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

        {/* Date of birth */}
        <div className="flex sm:justify-between w-full gap-4 sm:items-center sm:flex-row flex-col items-start">
          {/* Date of birth */}
          <InputForm
            defaultValue={formatDeadline(teacherData.date_of_birth)}
            label="Date of birth"
            placeholder="Date of birth"
            register={register("date_of_birth")}
            type="date"
            classes="w-full"
            isError={errors.date_of_birth != undefined}
          />

          {/* Hire Date */}
          <InputForm
            label="Hire Date"
            defaultValue={formatDeadline(teacherData.hire_date)}
            placeholder="Hire Date"
            register={register("hire_date")}
            type="date"
            classes="w-full"
            isError={errors.hire_date != undefined}
          />
        </div>
        <ErrorMessage error1={errors.date_of_birth} />

        {/* Address & Hire date */}
        <div className="flex sm:justify-between w-full gap-4 sm:items-center sm:flex-row flex-col items-start">
          <InputForm
            label="Address"
            placeholder="Address"
            register={register("address")}
            type="text"
            isError={errors.address != undefined}
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

        <Button
          disabled={uploadingImage || isPending}
          variant={"mainWithShadow"}
          type="submit">
          {uploadingImage ? (
            <>
              Uploading... <SmallLoader />
            </>
          ) : isPending ? (
            <>
              Updateing...
              <SmallLoader />
            </>
          ) : (
            "Update"
          )}
        </Button>
      </form>
    </>
  );
}
