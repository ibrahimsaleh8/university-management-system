"use client";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { AddExamSchema, ExamDataType } from "@/validation/AddExamValidation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GlobalToast from "@/components/Global/GlobalToast";
import { SlidingNumber } from "@/components/animate-ui/text/sliding-number";
import { examAllData } from "@/app/api/create/exam/route";
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorResponseType } from "@/lib/globalTypes";
import SmallLoader from "@/components/Global/SmallLoader";
import FormAddMainDataOfExam from "./FormAddMainDataOfExam";
import FormAddQuestions from "./QuestionForm";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ExamHeader from "./ExamHeader";
import QuestionForm from "./QuestionForm";
async function createExamApi(token: string, examData: examAllData) {
  await axios.post(`${MainDomain}/api/create/exam`, examData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export default function ShowAddingExam({ token }: { token: string }) {
  const className = useParams();
  const questionNumbersRef = useRef<HTMLInputElement>(null);

  const route = useRouter();
  const [numberOfQuestions, setNumberOfQuestions] = useState(1);
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["create_exam", className],
    mutationFn: (data: { token: string; examData: examAllData }) =>
      createExamApi(data.token, data.examData),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["class_exams", className.name] });
      GlobalToast({
        title: "Exam created successfully",
        icon: "success",
      });
      route.push(`/dashboard/teacher/classes/${className.name}`);
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
  });
  const { fields, append, remove } = useFieldArray({
    name: "questions",
    control,
  });

  // const HandleAddExam = () => {
  //   if (examQuestions.length != numberOfQuestions) {
  //     GlobalToast({
  //       title: "Check Questions Fields and save each Question",
  //       icon: "error",
  //     });
  //     return;
  //   }

  //   // Check Questions Total Marks
  //   const questionsTotalMarks = examQuestions
  //     .map((q) => q.mark)
  //     .reduce((f, s) => f + s);
  //   if (questionsTotalMarks != examMainData.totalMark) {
  //     GlobalToast({
  //       title: `Total Marks of Questions Doesn't equal Exam Mark ${examMainData.totalMark}`,
  //       icon: "error",
  //     });
  //     return;
  //   }

  //   // Conver Times To ISO Time
  //   examMainData.startDate = new Date(examMainData.startDate).toISOString();
  //   examMainData.endDate = new Date(examMainData.endDate).toISOString();
  //   examQuestions.forEach((question) => {
  //     delete question.id;
  //   });

  //   console.log(examQuestions);
  //   return;
  //   mutate({
  //     examData: { examMainData, examQuestionsData: examQuestions },
  //     token,
  //   });
  // };
  return (
    <div className="flex flex-col gap-4 relative">
      {/* Header */}
      <ExamHeader />

      <div className="sm:w-3/4 w-full mx-auto flex flex-col gap-4 mt-3">
        {/* Main Data */}
        <div className="bg-Second-black p-4 rounded-2xl flex flex-col gap-4">
          <p className="text-xl text-main-text font-bold border-l-4 border-main-text pl-3">
            Exam Details
          </p>
          <FormAddMainDataOfExam
            errors={errors}
            register={register}
            setValue={setValue}
          />
        </div>

        {/* Questions */}

        <div className="bg-Second-black p-4 rounded-2xl flex flex-col gap-4">
          {/* Top */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <p className="text-xl text-main-text font-bold border-l-4 border-main-text pl-3">
              Exam Questions
            </p>
            <p className="font-medium pr-4 text-low-white ">
              Total Mark:{" "}
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
            <button
              type="button"
              onClick={() =>
                append({
                  type: "CHOOSE",
                  mark: 0,
                  question: "",
                  rightAnswer: "",
                  chooses: ["", ""],
                })
              }>
              Add Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
