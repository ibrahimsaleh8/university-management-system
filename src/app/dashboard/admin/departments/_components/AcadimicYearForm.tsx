"use client";
import ErrorMessage from "@/app/dashboard/_components/forms/ErrorMessage";
import InputForm from "@/app/dashboard/_components/forms/InputForm";
import SmallLoader from "@/components/Global/SmallLoader";
import { Button } from "@/components/ui/button";

import { Dispatch, SetStateAction } from "react";
import { useAddAcademicYear } from "./hooks/useAddAcademicYear";

type Props = {
  setClose: Dispatch<SetStateAction<boolean>>;
  token: string;
};

export default function AcadimicYearForm({ token, setClose }: Props) {
  const {
    submitAddingForm,
    isPending,
    register,
    handleSubmit,
    setValue,
    errors,
  } = useAddAcademicYear({ token, setClose });
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
