import ErrorMessage from "@/app/dashboard/_components/forms/ErrorMessage";
import InputForm from "@/app/dashboard/_components/forms/InputForm";
import UploadImage from "@/app/dashboard/_components/forms/UploadImage";
import SmallLoader from "@/components/Global/SmallLoader";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Dispatch, SetStateAction } from "react";
import { useEditStudent } from "./hooks/useEditStudent";
import { GenderType } from "@/lib/globalTypes";
import { editStudentDataType } from "@/validation/EditStudentSchema";
import { formatDeadline } from "@/lib/FormatDeadline";
type Props = {
  setClose: Dispatch<SetStateAction<boolean>>;
  token: string;
  studentDeafultData: editStudentDataType;
};
export default function EditStudentForm({
  setClose,
  token,
  studentDeafultData,
}: Props) {
  const {
    handleStudentFormSubmit,
    isPending,
    errors,
    register,
    handleSubmit,
    setValue,
    loadingDepartment,
    departments,
    loadingYears,
    years,
    image,
    setImage,
    uploadingImage,
  } = useEditStudent({ setClose, token, studentDeafultData });
  return (
    <form
      onSubmit={handleSubmit(handleStudentFormSubmit)}
      className="flex flex-col gap-4 w-full">
      {/* Upload Image */}
      <div className="flex gap-2 flex-col sm:flex-row">
        <InputForm
          disabled={true}
          isError={errors.student_id != undefined}
          label="Student ID"
          placeholder="ID (14 digits)"
          register={register("student_id")}
          type="text"
          inputMode="numeric"
          pattern="\d{14}"
          maxLength={14}
        />
        <UploadImage
          title="Upload Student image"
          setImage={setImage}
          image={image}
          imageurl={studentDeafultData.image}
        />
      </div>
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

      {/* Email */}
      <div className="flex items-center justify-between gap-3">
        <InputForm
          isError={errors.email != undefined}
          label="Email"
          placeholder="Email"
          register={register("email")}
          type="email"
        />
      </div>
      <ErrorMessage error1={errors.email} />

      {/*   Gender & Date of birth */}
      <div className="flex sm:justify-between w-full gap-4 sm:items-center sm:flex-row flex-col items-start">
        {/* Date of birth */}
        <InputForm
          label="Date of birth"
          placeholder="Date of birth"
          type="date"
          onChange={(e) => setValue("date_of_birth", new Date(e.target.value))}
          classes="w-full"
          isError={errors.date_of_birth != undefined}
          defaultValue={formatDeadline(studentDeafultData.date_of_birth)}
        />
        {/* Gender */}
        <div className="flex flex-col gap-1 items-start w-full">
          <label htmlFor="gender" className="text-sm">
            Gender:
          </label>
          <Select
            defaultValue={studentDeafultData.gender}
            onValueChange={(e: GenderType) => setValue("gender", e)}>
            <SelectTrigger
              id="gender"
              className="w-full bg-Second-black border-soft-border cursor-pointer">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent className="bg-Second-black text-white border-soft-border">
              <SelectItem value="MALE">Male</SelectItem>
              <SelectItem value="FEMALE">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <ErrorMessage error1={errors.gender} error2={errors.date_of_birth} />

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

      <div className="flex items-center gap-3 flex-col sm:flex-row">
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
                defaultValue={`${studentDeafultData.departmentId}`}
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

        {/* Academic Years */}
        {loadingYears && !years ? (
          <Skeleton className="h-9 rounded-md w-full" />
        ) : (
          years && (
            <div className="flex flex-col gap-1 items-start w-full">
              <label htmlFor="academic" className="text-sm">
                Academic Year:
              </label>
              <Select
                defaultValue={`${studentDeafultData.academicYearId}`}
                onValueChange={(e: string) =>
                  setValue("academicYearId", parseInt(e))
                }>
                <SelectTrigger
                  id="academic"
                  className="w-full bg-Second-black border-soft-border cursor-pointer">
                  <SelectValue placeholder="Academic Year" />
                </SelectTrigger>
                <SelectContent className="bg-Second-black text-white border-soft-border">
                  {years
                    .filter((year) => year.level_number != 0)
                    .map((year) => (
                      <SelectItem value={`${year.id}`} key={year.id}>
                        {year.year_label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          )
        )}
      </div>

      <ErrorMessage
        error1={errors.departmentId}
        error2={errors.academicYearId}
      />

      <Button
        variant={"mainWithShadow"}
        disabled={isPending || uploadingImage}
        type="submit">
        {isPending ? (
          <div className="flex items-center gap-1">
            loading....
            <SmallLoader />
          </div>
        ) : uploadingImage ? (
          <div className="flex items-center gap-1">
            Uploading....
            <SmallLoader />
          </div>
        ) : (
          "Edit Student"
        )}
      </Button>
    </form>
  );
}
