"use client";
import { useRouter } from "next/navigation";
import { AddExamSchema, ExamDataType } from "@/validation/AddExamValidation";
import { Button } from "@/components/ui/button";
import GlobalToast from "@/components/Global/GlobalToast";
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorResponseType } from "@/lib/globalTypes";
import SmallLoader from "@/components/Global/SmallLoader";
import FormAddMainDataOfExam from "./FormAddMainDataOfExam";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ExamHeader from "./ExamHeader";
import QuestionForm from "./QuestionForm";
import ExamErrorMessage from "./ExamErrorMessage";
import AddNewQustion from "./AddNewQustion";
async function createExamApi(token: string, examData: ExamDataType) {
  await axios.post(`${MainDomain}/api/create/exam`, examData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
const rightAnswerLetters = ["A", "B", "C", "D"];

export default function ShowAddingExam({
  token,
  className,
}: {
  token: string;
  className: string;
}) {
  const route = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["create_exam", className],
    mutationFn: (data: { token: string; examData: ExamDataType }) =>
      createExamApi(data.token, data.examData),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["class_exams", className] });
      GlobalToast({
        title: "Exam created successfully",
        icon: "success",
      });
      route.push(`/dashboard/teacher/classes/${className}`);
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({
        title: err.response.data.message,
        icon: "error",
      });
    },
  });

  // Form Validation
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    control,
    watch,
  } = useForm<ExamDataType>({
    resolver: zodResolver(AddExamSchema),
    mode: "onSubmit",
    defaultValues: {
      className: className,
      autoMark: true,
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "questions",
    control,
  });
  const HandleAddExam: SubmitHandler<ExamDataType> = (data) => {
    const totalQuestionsMark = data.questions
      .map((q) => q.mark)
      .reduce((f, s) => f + s, 0);
    if (totalQuestionsMark != data.totalMark) {
      GlobalToast({
        icon: "warning",
        title: `Total Marks of questions doesn't equal exam mark ${data.totalMark}`,
      });
      return;
    }

    const questions = data.questions.map((q) => {
      if (q.type == "CHOOSE" && q.chooses) {
        const rightAnswer = q.chooses[
          rightAnswerLetters.indexOf(q.rightAnswer)
        ] as string;
        return {
          type: q.type,
          mark: q.mark,
          question: q.question,
          rightAnswer: rightAnswer,
          chooses: q.chooses,
        };
      }
      return q;
    });

    data.questions = questions;
    mutate({ examData: data, token });
  };

  return (
    <div className="flex flex-col gap-4 relative">
      {/* Header */}
      <ExamHeader />

      <form
        onSubmit={handleSubmit(HandleAddExam)}
        className="lg:w-[93%] overflow-x-hidden w-full mx-auto flex flex-col gap-4 mt-3">
        {/* Main Data */}
        <div className="bg-Second-black p-4 rounded-2xl flex flex-col gap-4">
          <p className="text-xl text-main-text font-bold border-l-4 border-main-text pl-3">
            Exam Details
          </p>
          <FormAddMainDataOfExam
            watch={watch}
            errors={errors}
            register={register}
            setValue={setValue}
          />
        </div>

        {errors.questions && errors.questions.message && (
          <ExamErrorMessage message={errors.questions.message as string} />
        )}
        {/* Questions */}

        <div className="bg-Second-black sm:p-4 pt-4 p-1 overflow-hidden pb-6 rounded-2xl flex flex-col gap-4">
          {/* Top */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <p className="text-xl text-main-text font-bold border-l-4 border-main-text pl-3">
              Exam Questions
            </p>
            <p className="font-medium pr-4 text-low-white ">
              Total Marks:{" "}
              <span className="text-main-text">
                {getValues("totalMark") ?? 0}
              </span>
            </p>
          </div>
          <div className="flex flex-col gap-6">
            {fields.map((field, index) => (
              <QuestionForm
                key={field.id}
                index={index}
                setValue={setValue}
                register={register}
                error={errors.questions?.[index]}
                watch={watch}
                remove={() => remove(index)}
              />
            ))}
            <AddNewQustion append={append} />
          </div>
        </div>

        <div className="flex items-center justify-end">
          <Button
            disabled={isPending}
            type="submit"
            className="w-36"
            variant={"mainWithShadow"}>
            {isPending ? <SmallLoader /> : "Create Exam"}
          </Button>
        </div>
      </form>
    </div>
  );
}
