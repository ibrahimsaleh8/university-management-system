"use client";

import ErrorMessage from "@/app/dashboard/_components/forms/ErrorMessage";
import InputForm from "@/app/dashboard/_components/forms/InputForm";
import GlobalToast from "@/components/Global/GlobalToast";
import SmallLoader from "@/components/Global/SmallLoader";
import { Button } from "@/components/ui/button";
import { ErrorResponseType } from "@/lib/globalTypes";
import {
  addSemesterDataType,
  addSemesterValidation,
} from "@/validation/AddSemesterValidation";
import { MainDomain } from "@/variables/MainDomain";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/animate-ui/radix/radio-group";
import ErrorMessageResponse from "@/app/dashboard/_components/ErrorMessageResponse";

type Props = {
  setClose: Dispatch<SetStateAction<boolean>>;
  token: string;
};

async function createNewSemester(
  semesterData: addSemesterDataType,
  token: string
) {
  await axios.post(`${MainDomain}/api/create/semester`, semesterData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export default function SemestrAddForm({ setClose, token }: Props) {
  const queryClient = useQueryClient();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<addSemesterDataType>({
    resolver: zodResolver(addSemesterValidation),
    mode: "onSubmit",
    defaultValues: {
      isActive: false,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["add_semester"],
    mutationFn: (data: { semesterData: addSemesterDataType; token: string }) =>
      createNewSemester(data.semesterData, data.token),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["get_all_semesters"],
      });
      queryClient.refetchQueries({
        queryKey: ["get_active_semester_main_courses"],
      });
      queryClient.refetchQueries({
        queryKey: ["get_all_courses_offering"],
      });
      setClose(true);
      GlobalToast({
        title: "Semester has been created successfully",
        icon: "success",
      });
    },
    onError: (err: ErrorResponseType) => {
      setServerError(err.response?.data?.message ?? "Something went wrong");
    },
  });

  const submitHandler: SubmitHandler<addSemesterDataType> = (data) => {
    mutate({
      semesterData: data,
      token,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col gap-3">
      {serverError && <ErrorMessageResponse message={serverError} />}

      <InputForm
        label="Name of Semester"
        placeholder="Name of Semester"
        register={register("name")}
        type="text"
        isError={errors.name != undefined}
      />
      <ErrorMessage error1={errors.name} />

      {/* Start & End Date of Semester */}
      <div className="flex sm:justify-between w-full gap-4 sm:items-center sm:flex-row flex-col items-start">
        <InputForm
          label="Start of Semester"
          placeholder="Start of Semester"
          register={register("startDate")}
          type="date"
          isError={errors.startDate != undefined}
        />

        {/* End Date */}
        <InputForm
          label="End of Semester"
          placeholder="End of Semester"
          register={register("endDate")}
          type="date"
          isError={errors.endDate != undefined}
        />
      </div>
      <ErrorMessage error1={errors.startDate} error2={errors.endDate} />

      {/* Start & End Date of Register */}
      <div className="flex sm:justify-between w-full gap-4 sm:items-center sm:flex-row flex-col items-start">
        <InputForm
          label="Start of Register"
          placeholder="Start of Register"
          register={register("registerBegin")}
          type="date"
          isError={errors.registerBegin != undefined}
        />

        {/* End Date */}
        <InputForm
          label="End of Register"
          placeholder="End of Register"
          register={register("registerDeadline")}
          type="date"
          isError={errors.registerDeadline != undefined}
        />
      </div>
      <ErrorMessage
        error1={errors.registerDeadline}
        error2={errors.registerBegin}
      />

      {/* Is Active */}
      <div className="flex flex-col gap-1 mt-3">
        <p className="font-medium">Activate this Semester ?</p>
        <RadioGroup
          onValueChange={(e) => setValue("isActive", e === "true")}
          defaultValue="false">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="true-option" />
            <label htmlFor="true-option">True</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="false-option" />
            <label htmlFor="false-option">False</label>
          </div>
        </RadioGroup>
      </div>
      <ErrorMessage error1={errors.isActive} />

      <Button disabled={isPending} className="mt-2" variant={"mainWithShadow"}>
        {isPending ? (
          <>
            Adding... <SmallLoader />
          </>
        ) : (
          "Add Semester"
        )}
      </Button>
    </form>
  );
}
