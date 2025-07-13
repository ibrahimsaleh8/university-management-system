import {
  examQuestionDataType,
  examQuestionSchema,
} from "@/validation/AddExamValidation";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BsQuestionOctagon } from "react-icons/bs";
import InputForm from "@/app/dashboard/_components/forms/InputForm";
import { Dispatch, SetStateAction, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/app/dashboard/_components/forms/ErrorMessage";
import { Button } from "@/components/ui/button";
import { MotionEffect } from "@/components/animate-ui/effects/motion-effect";
import { FaCheckCircle } from "react-icons/fa";
type examQuestionType = examQuestionDataType["type"];
type TRUE_FALSE_Answer_Type = "true" | "false";
type Props = {
  setExamQuestions: Dispatch<SetStateAction<examQuestionDataType[]>>;
  Qnumber: number;
};

export default function FormAddQuestions({ Qnumber, setExamQuestions }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<examQuestionDataType>({
    resolver: zodResolver(examQuestionSchema),
    mode: "all",
  });
  const [choosesValues, setChoosesValues] = useState({
    label_1: "",
    label_2: "",
    label_3: "",
    label_4: "",
  });
  const [isSaved, setIsSaved] = useState(false);

  const addQuestions: SubmitHandler<examQuestionDataType> = (data) => {
    if (data.type === "CHOOSE") {
      data.chooses = Object.values(choosesValues);
    }
    setExamQuestions((pre) => [...pre, data]);
    setIsSaved(true);
  };
  return (
    <MotionEffect
      fade
      blur="10px"
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
      inView>
      <form
        className="flex flex-col gap-3 py-5"
        onSubmit={handleSubmit(addQuestions)}>
        <div className="flex flex-col gap-2">
          <p className="flex items-center gap-2 font-bold">
            {isSaved ? (
              <FaCheckCircle className="w-4 h-4 text-main-text" />
            ) : (
              <BsQuestionOctagon className="w-4 h-4 text-main-text" />
            )}
            Question {Qnumber + 1}
          </p>

          {/* Title & Mark & type */}
          <div className="flex items-center justify-between gap-3 flex-col sm:flex-row">
            {/* Question Title */}
            <InputForm
              isError={errors.question != undefined}
              label="Question Title"
              placeholder="Question Title"
              type="text"
              register={register("question")}
            />
            {/* Question Mark */}
            <InputForm
              isError={errors.mark != undefined}
              label="Mark"
              placeholder="Question Mark"
              type="number"
              onChange={(e) => setValue("mark", +e.target.value)}
            />

            {/*   Question type */}
            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm" htmlFor="question-type">
                Type:
              </label>
              <Select
                onValueChange={(e: examQuestionType) => {
                  setValue("rightAnswer", "");
                  setValue("type", e);
                  setChoosesValues({
                    label_1: "",
                    label_2: "",
                    label_3: "",
                    label_4: "",
                  });
                }}>
                <SelectTrigger
                  id="question-type"
                  className="w-full cursor-pointer">
                  <SelectValue placeholder="Question Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CHOOSE">Choose</SelectItem>
                  <SelectItem value="TRUE_FALSE">True or Flase</SelectItem>
                  <SelectItem value="WRITE">Writing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <ErrorMessage error1={errors.question} error2={errors.mark} />
          <ErrorMessage error1={errors.type} />

          {/* Question Answers */}
          <div>
            {watch("type") == "TRUE_FALSE" && (
              <div className="flex flex-col gap-1 w-full">
                <label className="text-sm" htmlFor="right-answer">
                  Right Answer:
                </label>
                <Select
                  onValueChange={(e: TRUE_FALSE_Answer_Type) =>
                    setValue("rightAnswer", e)
                  }>
                  <SelectTrigger
                    id="right-answer"
                    className="sm:w-[180px] w-full cursor-pointer">
                    <SelectValue placeholder="Right Answer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">True</SelectItem>
                    <SelectItem value="false">False</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {watch("type") == "CHOOSE" && (
              <div className="flex items-end gap-3 flex-col">
                {/* Chooses */}
                <div className="flex w-full items-center gap-3 flex-col lg:flex-row">
                  <InputForm
                    isError={choosesValues.label_1 == ""}
                    onChange={(e) =>
                      setChoosesValues({
                        ...choosesValues,
                        label_1: e.target.value,
                      })
                    }
                    type="text"
                    placeholder="Option 1"
                    label="Option 1"
                  />
                  <InputForm
                    isError={choosesValues.label_2 == ""}
                    onChange={(e) =>
                      setChoosesValues({
                        ...choosesValues,
                        label_2: e.target.value,
                      })
                    }
                    type="text"
                    placeholder="Option 2"
                    label="Option 2"
                  />
                  <InputForm
                    isError={choosesValues.label_3 == ""}
                    onChange={(e) =>
                      setChoosesValues({
                        ...choosesValues,
                        label_3: e.target.value,
                      })
                    }
                    type="text"
                    placeholder="Option 3"
                    label="Option 3"
                  />
                  <InputForm
                    isError={choosesValues.label_4 == ""}
                    onChange={(e) =>
                      setChoosesValues({
                        ...choosesValues,
                        label_4: e.target.value,
                      })
                    }
                    type="text"
                    placeholder="Option 4"
                    label="Option 4"
                  />
                </div>

                {/* Right Choose */}
                <div className="flex w-full flex-col gap-1">
                  <label className="text-sm" htmlFor="right-choose-answer">
                    Right Answer:
                  </label>
                  <Select
                    disabled={
                      !Object.values(choosesValues).every(
                        (val) => val.length > 0
                      )
                    }
                    onValueChange={(e) => setValue("rightAnswer", e)}>
                    <SelectTrigger
                      id="right-choose-answer"
                      className="sm:w-[180px] w-full cursor-pointer">
                      <SelectValue placeholder="Right Answer" />
                    </SelectTrigger>
                    <SelectContent>
                      {choosesValues.label_1.length > 0 && (
                        <SelectItem
                          className="flex items-center gap-2"
                          key={1}
                          value={`1- ${choosesValues.label_1}`}>
                          <span>1-</span> {choosesValues.label_1}
                        </SelectItem>
                      )}
                      {choosesValues.label_2.length > 0 && (
                        <SelectItem
                          className="flex items-center gap-2"
                          key={2}
                          value={`2- ${choosesValues.label_2}`}>
                          <span>2-</span> {choosesValues.label_2}
                        </SelectItem>
                      )}
                      {choosesValues.label_3.length > 0 && (
                        <SelectItem
                          className="flex items-center gap-2"
                          key={3}
                          value={`3- ${choosesValues.label_3}`}>
                          <span>3-</span> {choosesValues.label_3}
                        </SelectItem>
                      )}
                      {choosesValues.label_4.length > 0 && (
                        <SelectItem
                          className="flex items-center gap-2"
                          key={4}
                          value={`4- ${choosesValues.label_4}`}>
                          <span>4-</span> {choosesValues.label_4}
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {watch("type") == "WRITE" && (
              <>
                <InputForm
                  isError={errors.rightAnswer != undefined}
                  label="Right Answer"
                  placeholder="Right Answer"
                  type="text"
                  register={register("rightAnswer")}
                />
              </>
            )}
            <ErrorMessage error1={errors.rightAnswer} />
          </div>

          <Button
            disabled={isSaved}
            className="bg-white w-32 text-black hover:bg-white hover:text-black duration-300">
            {isSaved ? "Saved" : `Save Q-${Qnumber + 1}`}
          </Button>
        </div>
      </form>
    </MotionEffect>
  );
}
