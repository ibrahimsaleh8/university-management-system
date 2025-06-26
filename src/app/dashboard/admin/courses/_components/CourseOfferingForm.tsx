import InputForm from "@/app/dashboard/_components/forms/InputForm";
import SelecetOption from "@/app/dashboard/_components/forms/SelecetOption";
import { GetTeachers } from "@/lib/GetTeachers";
import {
  courseOfferingDataType,
  courseOfferingValidationServer,
} from "@/validation/serverValidations/CourseOfferingValidationServer";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
type Props = {
  setClose: Dispatch<SetStateAction<boolean>>;
  token: string;
};
export default function CourseOfferingForm({}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<courseOfferingDataType>({
    resolver: zodResolver(courseOfferingValidationServer),
    mode: "all",
  });
  const submitNewCourseOffering: SubmitHandler<courseOfferingDataType> = (
    data
  ) => {
    console.log(data);
  };

  // API

  const { error, isError, isLoading, teachers } = GetTeachers(0);

  return (
    <form onSubmit={handleSubmit(submitNewCourseOffering)}>
      {/* ---- Apis ----
      - Courses
      - Academic Years
      - Teachers
      - Semester
      */}
      <SelecetOption />
      <InputForm
        isError={errors.hall != undefined}
        label="Hall"
        placeholder="Hall"
        register={register("hall")}
        type="text"
      />
    </form>
  );
}
