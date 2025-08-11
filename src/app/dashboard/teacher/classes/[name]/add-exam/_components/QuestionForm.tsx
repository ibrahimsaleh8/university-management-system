"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/animate-ui/radix/radio-group";

import { memo, useEffect, useMemo, useState } from "react";
import { MotionEffect } from "@/components/animate-ui/effects/motion-effect";
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { ExamDataType } from "@/validation/AddExamValidation";
import ExamTextAreaForm from "./ExamTextAreaForm";
import ExamInputForm from "./ExamInputForm";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import ErrorMessage from "@/app/dashboard/_components/forms/ErrorMessage";
import ExamErrorMessage from "./ExamErrorMessage";

type Props = {
  index: number;
  register: UseFormRegister<ExamDataType>;
  error?: Merge<FieldError, FieldErrorsImpl<ExamDataType["questions"][number]>>;
  remove: () => void;
  setValue: UseFormSetValue<ExamDataType>;
  watch: UseFormWatch<ExamDataType>;
};

function QuestionForm({
  index,
  error,
  setValue,
  register,
  watch,
  remove,
}: Props) {
  const [choosesValues, setChoosesValues] = useState({
    A: "",
    B: "",
    C: "",
    D: "",
  });

  const questionType = watch(`questions.${index}.type`);

  const isRightAnswerDisabled = useMemo(
    () => Object.values(choosesValues).some((v) => v.trim() === ""),
    [choosesValues]
  );
  useEffect(() => {
    if (isRightAnswerDisabled) {
      setValue(`questions.${index}.rightAnswer`, "");
    }
  }, [index, isRightAnswerDisabled, setValue]);
  useEffect(() => {
    if (!isRightAnswerDisabled) {
      setValue(`questions.${index}.chooses`, Object.values(choosesValues));
    }
  }, [choosesValues, index, isRightAnswerDisabled, setValue]);

  return (
    <MotionEffect
      fade
      blur="10px"
      transition={{ duration: 0.5, ease: "easeInOut" }}
      inView>
      <div className="flex flex-col gap-2 border border-[#292929] p-5 rounded-2xl relative bg-[#191717]">
        <button
          onClick={remove}
          className="bg-Second-Card-bg w-6 h-6 flex items-center justify-center p-1 rounded-sm cursor-pointer absolute right-2 top-2 ">
          <Trash2 className="w-4 h-4" />
        </button>
        <p className="flex items-center font-medium gap-2 text-sm bg-Second-black w-fit px-1 text-low-white absolute top-[-13px] left-4">
          Q-{index + 1}
        </p>

        {/* Title & Mark & Type */}
        <div className="flex items-start justify-between gap-3 flex-col lg:flex-row ">
          {/* Left */}
          <div className="w-full flex flex-col gap-2">
            <ExamTextAreaForm
              isError={error?.question != undefined}
              label={`Question-${index + 1} Title`}
              placeholder={`Question ${index + 1} Title`}
              {...register(`questions.${index}.question`)}
            />
            <ErrorMessage error1={error?.question} />
            {questionType == "CHOOSE" && (
              <div className="flex flex-col gap-3">
                <p className="text-sm font-medium">Choices</p>
                <div className="flex items-center gap-2">
                  <label
                    htmlFor={`a-answer-${index}`}
                    className="text-sm font-bold text-low-white">
                    A.
                  </label>
                  <Input
                    onChange={(e) =>
                      setChoosesValues({
                        ...choosesValues,
                        A: e.target.value,
                      })
                    }
                    className="bg-Second-Card-bg"
                    id={`a-answer-${index}`}
                    type="text"
                    placeholder="A- Answer"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label
                    htmlFor={`b-answer-${index}`}
                    className="text-sm font-bold text-low-white">
                    B.
                  </label>
                  <Input
                    onChange={(e) =>
                      setChoosesValues({
                        ...choosesValues,
                        B: e.target.value,
                      })
                    }
                    className="bg-Second-Card-bg"
                    id={`b-answer-${index}`}
                    type="text"
                    placeholder="B- Answer"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label
                    htmlFor={`c-answer-${index}`}
                    className="text-sm font-bold text-low-white">
                    C.
                  </label>
                  <Input
                    onChange={(e) =>
                      setChoosesValues({
                        ...choosesValues,
                        C: e.target.value,
                      })
                    }
                    className="bg-Second-Card-bg"
                    id={`c-answer-${index}`}
                    type="text"
                    placeholder="C- Answer"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label
                    htmlFor={`d-answer-${index}`}
                    className="text-sm font-bold text-low-white">
                    D.
                  </label>
                  <Input
                    onChange={(e) =>
                      setChoosesValues({
                        ...choosesValues,
                        D: e.target.value,
                      })
                    }
                    className="bg-Second-Card-bg"
                    id={`d-answer-${index}`}
                    type="text"
                    placeholder="D- Answer"
                  />
                </div>
              </div>
            )}

            {questionType == "WRITE" && (
              <>
                <ExamTextAreaForm
                  label={`Q-${index + 1} Model Answer`}
                  placeholder="Correct Answer"
                  {...register(`questions.${index}.rightAnswer`)}
                />
              </>
            )}
          </div>

          {/* Right */}
          <div className="flex flex-col gap-3 lg:w-1/2 w-full">
            {/* Question Mark */}
            <ExamInputForm
              isError={error?.mark != undefined}
              label={`Question-${index + 1} Mark`}
              placeholder={`Question-${index + 1} Mark`}
              type="number"
              onChange={(e) =>
                setValue(`questions.${index}.mark`, +e.target.value)
              }
            />
            {error?.mark && error.mark.message && (
              <ExamErrorMessage message={error.mark.message} />
            )}
            {/* Correct Answer */}
            <div>
              {questionType == "CHOOSE" && !isRightAnswerDisabled && (
                <div className="flex flex-col gap-1">
                  <label
                    className="text-sm"
                    htmlFor={`right-answer-choose-${index}`}>
                    Right Answer
                  </label>
                  <Select
                    disabled={isRightAnswerDisabled}
                    onValueChange={(e: "A" | "B" | "C" | "D") => {
                      setValue(`questions.${index}.rightAnswer`, e);
                    }}>
                    <SelectTrigger
                      id={`right-answer-choose-${index}`}
                      className="w-full bg-Second-Card-bg">
                      <SelectValue placeholder="Right Answer" />
                    </SelectTrigger>
                    <SelectContent className="bg-Second-Card-bg">
                      <SelectItem value="A">Choice A</SelectItem>
                      <SelectItem value="B">Choice B</SelectItem>
                      <SelectItem value="C">Choice C</SelectItem>
                      <SelectItem value="D">Choice D</SelectItem>
                    </SelectContent>
                  </Select>
                  {isRightAnswerDisabled && (
                    <p className="text-xs text-red-400">
                      Fill all choices to select correct answer
                    </p>
                  )}
                </div>
              )}
              {questionType == "TRUE_FALSE" && (
                <div className="flex flex-col gap-2">
                  <p className="text-sm">Right Answer:</p>
                  <RadioGroup
                    onValueChange={(e) =>
                      setValue(`questions.${index}.rightAnswer`, e)
                    }
                    className="flex items-center gap-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id={`true-${index}`} />
                      <label htmlFor={`true-${index}`}>True</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id={`false-${index}`} />
                      <label htmlFor={`false-${index}`}>False</label>
                    </div>
                  </RadioGroup>
                </div>
              )}

              {error?.rightAnswer && (
                <p className="text-sm text-red-500">
                  * {error.rightAnswer.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </MotionEffect>
  );
}
export default memo(QuestionForm);
