"use client";
import ErrorMessage from "@/app/dashboard/_components/forms/ErrorMessage";
import InputForm from "@/app/dashboard/_components/forms/InputForm";
import GlobalToast from "@/components/Global/GlobalToast";
import SmallLoader from "@/components/Global/SmallLoader";
import { Button } from "@/components/ui/button";
import { ErrorResponseType } from "@/lib/globalTypes";
import {
  academicYearDataType,
  academicYearValidation,
} from "@/validation/AddAcademicYearValidation";
import { MainDomain } from "@/variables/MainDomain";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
  setClose: Dispatch<SetStateAction<boolean>>;
  token: string;
};

async function addNewAcademicYear(
  Yeardata: academicYearDataType,
  token: string
) {
  await axios.post(`${MainDomain}/api/create/academic-year`, Yeardata, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export default function AcadimicYearForm({ token, setClose }: Props) {
  const reactQueryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<academicYearDataType>({
    resolver: zodResolver(academicYearValidation),
    mode: "all",
  });

  // Query Api
  const { isPending, mutate } = useMutation({
    mutationKey: ["add_academic_year"],
    mutationFn: (data: { Yeardata: academicYearDataType; token: string }) =>
      addNewAcademicYear(data.Yeardata, data.token),
    onSuccess: () => {
      reactQueryClient.refetchQueries({
        queryKey: ["get_all_years"],
      });
      setClose(true);
      GlobalToast({
        title: "Academic Year has been created successfully",
        icon: "success",
      });
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({
        title: err.response.data.message,
        icon: "error",
      });
    },
  });

  const submitAddingForm: SubmitHandler<academicYearDataType> = (data) => {
    mutate({
      Yeardata: data,
      token,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(submitAddingForm)}
      className="flex flex-col gap-3">
      <InputForm
        isError={errors.year_label != undefined}
        label="Academic Year Label"
        placeholder="Academic Year Label"
        register={register("year_label")}
        type="text"
      />
      <ErrorMessage error1={errors.year_label} />
      <InputForm
        isError={errors.level_number != undefined}
        label="Academic Year Level Number"
        placeholder="Academic Year Level Number"
        onChange={(e) => setValue("level_number", +e.target.value)}
        type="number"
        min={0}
        max={6}
      />
      <ErrorMessage error1={errors.level_number} />

      <Button
        disabled={isPending}
        className="mt-2"
        type="submit"
        variant="mainWithShadow">
        {isPending ? (
          <>
            Adding... <SmallLoader />
          </>
        ) : (
          "Add Academic Year"
        )}
      </Button>
    </form>
  );
}
