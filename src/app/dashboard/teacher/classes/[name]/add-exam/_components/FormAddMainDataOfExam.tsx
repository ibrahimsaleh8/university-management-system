"use client";

import ErrorMessage from "@/app/dashboard/_components/forms/ErrorMessage";
import ExamInputForm from "./ExamInputForm";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { ExamDataType } from "@/validation/AddExamValidation";
import { Switch } from "@/components/animate-ui/radix/switch";

type Props = {
  register: UseFormRegister<ExamDataType>;
  errors: FieldErrors<ExamDataType>;
  setValue: UseFormSetValue<ExamDataType>;
  watch: UseFormWatch<ExamDataType>;
};

export default function FormAddMainDataOfExam({
  errors,
  register,
  setValue,
  watch,
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      {/* Title & Duration */}
      <div className="flex items-center sm:gap-6 gap-3 flex-col sm:flex-row">
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
      <div className="flex items-center sm:gap-6 gap-3 flex-col sm:flex-row">
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
      <div className="flex items-end sm:gap-6 gap-3 flex-col sm:flex-row">
        <div className="sm:w-1/2 w-full">
          <ExamInputForm
            isError={errors.totalMark != undefined}
            label="Exam Total Marks"
            placeholder="Exam Total Marks"
            type="number"
            onChange={(e) => setValue("totalMark", +e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2 pb-2 sm:w-1/2 w-full text-lg flex-wrap">
          <label htmlFor="auto-mark">Auto Mark</label>
          <Switch
            className="w-16 h-7"
            defaultChecked
            onCheckedChange={(e) => setValue("autoMark", e)}
            id="auto-mark"
          />
          {watch("autoMark") ? (
            <span className="text-xs text-main-text bg-glass-main-text px-2 py-1 rounded-2xl">
              Active
            </span>
          ) : (
            <span className="text-xs text-red-500 bg-glass-red px-2 py-1 rounded-2xl">
              Not Active
            </span>
          )}
        </div>
      </div>

      <ErrorMessage error1={errors.totalMark} />
    </div>
  );
}
