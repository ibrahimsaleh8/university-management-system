"use client";

import ErrorMessage from "@/app/dashboard/_components/forms/ErrorMessage";
import InputForm from "@/app/dashboard/_components/forms/InputForm";
import { Button } from "@/components/ui/button";
import {
  examMainDataType,
  examValidationSchema,
} from "@/validation/AddExamValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
// type AddExamDataType = examMainDataType & { questions: examQuestionDataType[] };
type Props = {
  className: string;
  ExamData: examMainDataType;
  setExamMainData: Dispatch<SetStateAction<examMainDataType>>;
  setLevel: Dispatch<SetStateAction<number>>;
};

export default function FormAddMainDataOfExam({
  setLevel,
  ExamData,
  setExamMainData,
}: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<examMainDataType>({
    resolver: zodResolver(examValidationSchema),
    mode: "all",
    defaultValues: { ...ExamData },
  });

  const submitNewExam: SubmitHandler<examMainDataType> = (data) => {
    setLevel(2);
    setExamMainData(data);
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(submitNewExam)}
      className="flex flex-col gap-3">
      {/* Title & Duration */}
      <div className="flex items-center gap-2 flex-col sm:flex-row">
        <InputForm
          isError={errors.title != undefined}
          label="Exam Title"
          placeholder="Exam Title"
          type="text"
          register={register("title")}
          defaultValue={getValues("title")}
        />
        <InputForm
          isError={errors.duration != undefined}
          label="Exam Duration in minutes"
          placeholder="Exam Duration in minutes"
          type="number"
          onChange={(e) => setValue("duration", +e.target.value)}
          defaultValue={getValues("duration")}
        />
      </div>
      <ErrorMessage error1={errors.title} error2={errors.duration} />

      {/* Start Date & End Date */}
      <div className="flex items-center gap-2 flex-col sm:flex-row">
        <InputForm
          isError={errors.startDate != undefined}
          label="Start Date"
          placeholder="Start Date"
          type="datetime-local"
          register={register("startDate")}
          defaultValue={getValues("startDate")}
        />
        <InputForm
          isError={errors.endDate != undefined}
          label="End Date"
          placeholder="End Date"
          type="datetime-local"
          register={register("endDate")}
          defaultValue={getValues("endDate")}
        />
      </div>
      <ErrorMessage error1={errors.startDate} error2={errors.endDate} />

      <InputForm
        isError={errors.totalMark != undefined}
        label="Exam Total Marks"
        placeholder="Exam Total Marks"
        type="number"
        onChange={(e) => setValue("totalMark", +e.target.value)}
        defaultValue={getValues("totalMark")}
      />
      <ErrorMessage error1={errors.totalMark} />

      <div className="flex items-center justify-end">
        <Button type="submit" className="gap-1" variant={"mainWithShadow"}>
          Next <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </form>
  );
}
