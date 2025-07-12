"use client";
import BackButton from "@/app/dashboard/_components/forms/BackButton";
import FormAddMainDataOfExam from "../../_components/FormAddMainDataOfExam";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Progress } from "@/components/animate-ui/radix/progress";
import { Button } from "@/components/ui/button";
import { examMainDataType } from "@/validation/AddExamValidation";

export default function AddExamPage() {
  const className = useParams();
  const [level, setLevel] = useState(1);
  const [examMainData, setExamMainData] = useState<examMainDataType>({
    className: "",
    duration: 0,
    endDate: "",
    startDate: "",
    title: "",
    totalMark: 0,
  });

  return (
    <div className="flex flex-col gap-4">
      <p className="font-bold flex items-center gap-3 w-full bg-[#252525] text-white rounded-md px-4 clip-path-div py-4">
        <BackButton withText={false} />
        Add New Exam
      </p>
      <div className="w-3/4 mx-auto flex flex-col gap-4 mt-3">
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
        )}
        {level == 2 && (
          <div>
            <p className="text-sm border-b border-soft-border pb-3">
              Exam Questions
            </p>
            <div>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam,
              reprehenderit. Mollitia exercitationem aperiam reprehenderit illo
              vitae enim, inventore consequuntur, et itaque debitis atque totam,
              expedita doloribus voluptatibus velit aliquid animi.
            </div>
          </div>
        )}

        <Button onClick={() => setLevel(1)}>BACK</Button>
      </div>
    </div>
  );
}
