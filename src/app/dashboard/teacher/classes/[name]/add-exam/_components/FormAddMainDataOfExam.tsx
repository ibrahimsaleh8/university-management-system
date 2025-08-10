"use client";

import ErrorMessage from "@/app/dashboard/_components/forms/ErrorMessage";
import ExamInputForm from "./ExamInputForm";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { ExamDataType } from "@/validation/AddExamValidation";

type Props = {
  register: UseFormRegister<ExamDataType>;
  errors: FieldErrors<ExamDataType>;
  setValue: UseFormSetValue<ExamDataType>;
};

export default function FormAddMainDataOfExam({
  errors,
  register,
  setValue,
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      {/* Title & Duration */}
      <div className="flex items-center gap-2 flex-col sm:flex-row">
        <ExamInputForm
          isError={errors.title != undefined}
          label="Exam Title"
          placeholder="Exam Title"
          type="text"
          {...register("title")}
        />
        <ExamInputForm
          isError={errors.duration != undefined}
          label="Exam Duration in minutes"
          placeholder="Exam Duration in minutes"
          type="number"
          onChange={(e) => setValue("duration", +e.target.value)}
        />
      </div>
      <ErrorMessage error1={errors.title} error2={errors.duration} />

      {/* Start Date & End Date */}
      <div className="flex items-center gap-2 flex-col sm:flex-row">
        <ExamInputForm
          isError={errors.startDate != undefined}
          label="Start Date"
          placeholder="Start Date"
          type="datetime-local"
          {...register("startDate")}
        />
        <ExamInputForm
          isError={errors.endDate != undefined}
          label="End Date"
          placeholder="End Date"
          type="datetime-local"
          {...register("endDate")}
        />
      </div>
      <ErrorMessage error1={errors.startDate} error2={errors.endDate} />

      <ExamInputForm
        isError={errors.totalMark != undefined}
        label="Exam Total Marks"
        placeholder="Exam Total Marks"
        type="number"
        onChange={(e) => setValue("totalMark", +e.target.value)}
      />
      <ErrorMessage error1={errors.totalMark} />
    </div>
  );
}
