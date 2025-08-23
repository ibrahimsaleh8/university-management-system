"use client";

import { semesterDataType } from "@/lib/GetAllSemesters";

import ErrorMessage from "@/app/dashboard/_components/forms/ErrorMessage";
import InputForm from "@/app/dashboard/_components/forms/InputForm";
import { Button } from "@/components/ui/button";
import {
  addSemesterDataType,
  addSemesterValidation,
} from "@/validation/AddSemesterValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/animate-ui/radix/radio-group";
import ErrorMessageResponse from "@/app/dashboard/_components/ErrorMessageResponse";
import { useState } from "react";
import { formatDeadline } from "@/lib/FormatDeadline";
import { Switch } from "@/components/animate-ui/radix/switch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";
import GlobalToast from "@/components/Global/GlobalToast";
import { ErrorResponseType } from "@/lib/globalTypes";
import SmallLoader from "@/components/Global/SmallLoader";

type Props = {
  semesterData: semesterDataType;
  token: string;
};

type updateSemesterDataType = {
  token: string;
  semesterData: addSemesterDataType;
  id: string;
};
async function updateSemester({
  id,
  semesterData,
  token,
}: updateSemesterDataType) {
  await axios.put(`${MainDomain}/api/update/semester/${id}`, semesterData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export default function UpdateSemester({ semesterData, token }: Props) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [update, setUpdate] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<addSemesterDataType>({
    resolver: zodResolver(addSemesterValidation),
    mode: "all",
    defaultValues: {
      isActive: semesterData.isActive,
      name: semesterData.name,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (apiParams: updateSemesterDataType) =>
      updateSemester(apiParams),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["get_all_semesters"],
      });
      setServerError(null);
      GlobalToast({
        title: "Semester has been updated successfully",
        icon: "success",
      });
    },
    onError: (err: ErrorResponseType) => {
      setServerError(err.response?.data?.message ?? "Something went wrong");
    },
  });

  const submitHandler: SubmitHandler<addSemesterDataType> = (data) => {
    mutate({
      id: semesterData.id,
      semesterData: data,
      token,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col gap-3">
      <div className="flex gap-2 justify-between pb-4">
        <p className="px-3 py-1 bg-Second-Card-bg rounded-sm text-sm capitalize">
          {update ? "Update" : "Show"} mode
        </p>
        <div className="flex items-center gap-3">
          <Switch onCheckedChange={(e) => setUpdate(e)} />
          <p>{update ? "Update" : "Show"}</p>
        </div>
      </div>
      {serverError && <ErrorMessageResponse message={serverError} />}
      <InputForm
        label="Name of Semester"
        placeholder="Name of Semester"
        register={register("name")}
        type="text"
        disabled={!update}
        isError={errors.name != undefined}
      />
      <ErrorMessage error1={errors.name} />

      {/* Start & End Date of Semester */}
      <div className="flex sm:justify-between w-full gap-4 sm:items-center sm:flex-row flex-col items-start">
        <InputForm
          label="Start of Semester"
          placeholder="Start of Semester"
          register={register("startDate")}
          disabled={!update}
          type="date"
          isError={errors.startDate != undefined}
          defaultValue={formatDeadline(semesterData.startDate)}
        />

        {/* End Date */}
        <InputForm
          label="End of Semester"
          placeholder="End of Semester"
          register={register("endDate")}
          disabled={!update}
          type="date"
          isError={errors.endDate != undefined}
          defaultValue={formatDeadline(semesterData.endDate)}
        />
      </div>
      <ErrorMessage error1={errors.startDate} error2={errors.endDate} />

      {/* Start & End Date of Register */}
      <div className="flex sm:justify-between w-full gap-4 sm:items-center sm:flex-row flex-col items-start">
        <InputForm
          label="Start of Register"
          placeholder="Start of Register"
          register={register("registerBegin")}
          disabled={!update}
          type="date"
          isError={errors.registerBegin != undefined}
          defaultValue={formatDeadline(semesterData.registerBegin)}
        />

        {/* End Date */}
        <InputForm
          label="End of Register"
          placeholder="End of Register"
          register={register("registerDeadline")}
          disabled={!update}
          type="date"
          isError={errors.registerDeadline != undefined}
          defaultValue={formatDeadline(semesterData.registerDeadline)}
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
          disabled={!update}
          onValueChange={(e) => setValue("isActive", e === "true")}
          defaultValue={semesterData.isActive ? "true" : "false"}>
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

      <Button
        disabled={!update || isPending}
        className="mt-2"
        variant={"mainWithShadow"}>
        {isPending ? (
          <>
            Updateing... <SmallLoader />
          </>
        ) : (
          "Update"
        )}
      </Button>
    </form>
  );
}
