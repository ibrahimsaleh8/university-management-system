import ErrorMessageResponse from "@/app/dashboard/_components/ErrorMessageResponse";
import ErrorMessage from "@/app/dashboard/_components/forms/ErrorMessage";
import InputForm from "@/app/dashboard/_components/forms/InputForm";
import { Switch } from "@/components/animate-ui/radix/switch";
import SmallLoader from "@/components/Global/SmallLoader";
import { Button } from "@/components/ui/button";
import { academicYearsDataType } from "@/lib/GetAllYears";
import { useEditAcademicYear } from "./hooks/useEditAcademicYear";
type Props = {
  token: string;
  yearData: academicYearsDataType;
};

export default function EditAcademicYear({ yearData, token }: Props) {
  const {
    submitAddingForm,
    isPending,
    register,
    handleSubmit,
    setValue,
    errors,
    update,
    setUpdate,
    serverError,
  } = useEditAcademicYear({ yearData, token });
  return (
    <form
      onSubmit={handleSubmit(submitAddingForm)}
      className="flex flex-col gap-3">
      {/* Top */}
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
        isError={errors.year_label != undefined}
        label="Academic Year Label"
        placeholder="Academic Year Label"
        register={register("year_label")}
        type="text"
        disabled={!update}
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
        disabled={!update}
        defaultValue={yearData.level_number}
      />
      <ErrorMessage error1={errors.level_number} />

      <Button
        disabled={!update || isPending}
        className="mt-2"
        type="submit"
        variant="mainWithShadow">
        {isPending ? (
          <>
            Updateing... <SmallLoader />
          </>
        ) : (
          "Edit Academic Year"
        )}
      </Button>
    </form>
  );
}
