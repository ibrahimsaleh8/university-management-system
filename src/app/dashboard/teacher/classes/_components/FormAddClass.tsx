"use client";
import InputForm from "@/app/dashboard/_components/forms/InputForm";
import { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorMessage from "@/app/dashboard/_components/forms/ErrorMessage";
import { Button } from "@/components/ui/button";
import SmallLoader from "@/components/Global/SmallLoader";
import { Info, Upload } from "lucide-react";
import Image from "next/image";
import { useAddClass } from "./Hook/useAddClass";
type Props = {
  setClose: Dispatch<SetStateAction<boolean>>;
  token: string;
};

export default function FormAddClass({ token, setClose }: Props) {
  const {
    courses,
    errors,
    handleSubmit,
    isPending,
    loadingCourses,
    register,
    setClassImage,
    submitAddClass,
    uploadingImage,
    setValue,
    classImage,
  } = useAddClass({ token, setClose });
  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={handleSubmit(submitAddClass)}>
      {/* Name & Department */}
      <div className="flex gap-2 justify-between items-center flex-col sm:flex-row">
        <InputForm
          isError={errors.name != undefined}
          label="Name"
          placeholder="Class Name"
          register={register("name")}
          type="text"
        />

        {/* Courses */}
        {loadingCourses && !courses ? (
          <Skeleton className="w-full h-10 rounded-md" />
        ) : (
          courses && (
            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm text-left" htmlFor="course">
                Course:
              </label>
              <Select onValueChange={(e) => setValue("courseOfferingId", e)}>
                <SelectTrigger id="course" className="w-full">
                  <SelectValue placeholder="Course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.length > 0 ? (
                    courses.map((cours) => (
                      <SelectItem key={cours.id} value={cours.id}>
                        {cours.course}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="none" disabled>
                      No Courses Found
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          )
        )}
      </div>
      <ErrorMessage error1={errors.name} error2={errors.courseOfferingId} />

      {/* Image */}
      <div className="flex flex-col gap-2">
        <p className="flex items-center gap-2">
          <span className="w-full h-0.5 bg-soft-border"></span>
          <span className="text-low-white">image</span>
          <span className="w-full h-0.5 bg-soft-border"></span>
        </p>
        <p className="text-sm text-low-white capitalize font-medium flex items-start gap-1">
          <Info className="w-5 h-5 text-blue-400" />
          if you want to change the deafult image you can upload your new image
          or you can skip it and stay with deafult image
        </p>
        {/* Upload Class Image */}
        <div className="flex flex-col gap-2 items-center p-3 border border-dashed border-soft-border">
          <div className="bg-Second-Card-bg w-10 h-10 flex items-center justify-center rounded-full">
            <Upload className="w-5 h-5 text-low-white" />
          </div>
          <p>Upload Image</p>
          <label
            htmlFor="upload-image"
            className="bg-blue-600 text-sm px-4 py-1.5 rounded-sm hover:bg-blue-700 duration-300 flex items-center gap-1 cursor-pointer">
            <Upload className="w-4 h-4" />
            Select file
          </label>
          <input
            type="file"
            accept="image/*"
            id="upload-image"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setClassImage(file);
              }
            }}
          />
        </div>

        {/* Show Uploaded Image */}
        <div className="w-full h-64 rounded-md overflow-hidden bg-Second-Card-bg relative">
          {classImage ? (
            <img
              className="w-full h-full object-center object-cover rounded-md"
              alt="Student Image"
              src={URL.createObjectURL(classImage)}
            />
          ) : (
            <>
              <Image
                src={
                  "https://res.cloudinary.com/dnriyuqpv/image/upload/v1753974406/students/amrnsz0x3ult9r0kpdxf.webp"
                }
                alt="Deafult Image"
                className="!w-full !h-full object-center object-cover"
                width={1000}
                height={300}
              />
              <span className="absolute left-0 bottom-0 flex items-center justify-center bg-[#3e3e3ebf] text-white w-full h-10 z-50">
                Default image
              </span>
            </>
          )}
        </div>
      </div>

      <Button
        disabled={isPending || uploadingImage}
        variant={"mainWithShadow"}
        type="submit">
        {isPending ? (
          <>
            Adding....
            <SmallLoader />
          </>
        ) : uploadingImage ? (
          <>
            Uploading....
            <SmallLoader />
          </>
        ) : (
          "Add Class"
        )}
      </Button>
    </form>
  );
}
