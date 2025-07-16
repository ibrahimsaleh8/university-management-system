"use client";
import BackButton from "@/app/dashboard/_components/forms/BackButton";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Progress } from "@/components/animate-ui/radix/progress";
import {
  examMainDataType,
  examQuestionDataType,
} from "@/validation/AddExamValidation";
import { MotionEffect } from "@/components/animate-ui/effects/motion-effect";
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
import FormAddQuestions from "./FormAddQuestions";
async function createExamApi(token: string, examData: examAllData) {
  await axios.post(`${MainDomain}/api/create/exam`, examData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export type questionDataWithId = examQuestionDataType & { id?: string };
export default function ShowAddingExam({ token }: { token: string }) {
  const className = useParams();
  const [level, setLevel] = useState(1);
  const questionNumbersRef = useRef<HTMLInputElement>(null);
  const [examMainData, setExamMainData] = useState<examMainDataType>({
    className: className.name as string,
    duration: 0,
    endDate: "",
    startDate: "",
    title: "",
    totalMark: 0,
  });
  const route = useRouter();
  const [examQuestions, setExamQuestions] = useState<questionDataWithId[]>([]);
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

  const HandleAddExam = () => {
    if (examQuestions.length != numberOfQuestions) {
      GlobalToast({
        title: "Check Questions Fields and save each Question",
        icon: "error",
      });
      return;
    }

    // Check Questions Total Marks
    const questionsTotalMarks = examQuestions
      .map((q) => q.mark)
      .reduce((f, s) => f + s);
    if (questionsTotalMarks != examMainData.totalMark) {
      GlobalToast({
        title: `Total Marks of Questions Doesn't equal Exam Mark ${examMainData.totalMark}`,
        icon: "error",
      });
      return;
    }

    // Conver Times To ISO Time
    examMainData.startDate = new Date(examMainData.startDate).toISOString();
    examMainData.endDate = new Date(examMainData.endDate).toISOString();
    examQuestions.forEach((question) => {
      delete question.id;
    });

    mutate({
      examData: { examMainData, examQuestionsData: examQuestions },
      token,
    });
  };
  return (
    <div className="flex flex-col gap-4 relative">
      <p className="font-bold flex items-center gap-3 w-full bg-[#252525] text-white rounded-md px-4 clip-path-div py-4">
        <BackButton withText={false} />
        Add New Exam
      </p>
      <div className="sm:w-3/4 w-full mx-auto flex flex-col gap-4 mt-3">
        <div className="flex items-center gap-3 w-full justify-between ">
          <div className="flex flex-col gap-3 text-center items-center justify-center">
            <p
              className={`w-10 h-10 flex items-center justify-center duration-500 ${
                level == 1
                  ? "bg-main-text text-black"
                  : "bg-Second-black text-white"
              }  font-bold rounded-full`}>
              {1}
            </p>
            <span className="text-xs text-low-white">
              Main Informations of Exam
            </span>
          </div>
          <Progress value={(level / 2) * 100} />
          <div className="flex flex-col gap-3 items-center text-center justify-center">
            <p
              className={`w-10 ${
                level == 2
                  ? "bg-main-text text-black"
                  : "bg-Second-black text-white"
              }  h-10 flex items-center justify-center duration-500 bg-Second-black rounded-full`}>
              2
            </p>
            <span className="text-xs text-low-white">Exam Questions</span>
          </div>
        </div>

        {level == 1 && (
          <MotionEffect slide={{ direction: "right" }}>
            <div>
              <p className="text-sm border-b border-soft-border pb-3">
                Exam Main Informations
              </p>
              <FormAddMainDataOfExam
                ExamData={examMainData}
                setExamMainData={setExamMainData}
                setLevel={setLevel}
                className={className.name as string}
              />
            </div>
          </MotionEffect>
        )}

        {level == 2 && (
          <MotionEffect slide={{ direction: "right" }}>
            <div>
              {/* Header */}
              <div className="flex items-end justify-between gap-3 border-b border-soft-border pb-3">
                <p className="text-sm font-bold">Exam Questions</p>
                <div className="flex items-end gap-2">
                  <div className="w-fit flex flex-col gap-1">
                    <label className="text-sm" htmlFor="number-questions">
                      Number of Questions:
                    </label>
                    <Input
                      ref={questionNumbersRef}
                      defaultValue={numberOfQuestions}
                      id="number-questions"
                      type="number"
                      placeholder="Number Of Questions"
                      min={1}
                    />
                  </div>
                  <Button
                    onClick={() => {
                      if (questionNumbersRef.current) {
                        setNumberOfQuestions(+questionNumbersRef.current.value);
                      }
                    }}
                    className="bg-white text-black hover:bg-white hover:text-black">
                    Add
                  </Button>
                </div>
              </div>
              {Array.from({ length: numberOfQuestions }).map((_e, i) => (
                <FormAddQuestions
                  key={i}
                  setExamQuestions={setExamQuestions}
                  Qnumber={i}
                />
              ))}
            </div>

            <div className="flex flex-col items-end gap-3">
              <Button
                disabled={isPending}
                className="mt-5 w-36 "
                onClick={() => HandleAddExam()}
                variant={"mainWithShadow"}>
                {isPending ? (
                  <>
                    Saveing.. <SmallLoader />
                  </>
                ) : (
                  "Save Exam"
                )}
              </Button>
              <p className="text-xs text-low-white flex items-center gap-2">
                Saved Questions:
                <SlidingNumber number={examQuestions.length} />
              </p>
            </div>
          </MotionEffect>
        )}
      </div>
    </div>
  );
}
