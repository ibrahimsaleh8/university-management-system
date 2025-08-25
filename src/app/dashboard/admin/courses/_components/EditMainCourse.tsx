import ErrorMessage from "@/app/dashboard/_components/forms/ErrorMessage";
import InputForm from "@/app/dashboard/_components/forms/InputForm";
import { Skeleton } from "@/components/ui/skeleton";
import { coursesDataType } from "@/lib/GetAllMainCourses";
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
import { Button } from "@/components/ui/button";
import SmallLoader from "@/components/Global/SmallLoader";
import { Switch } from "@/components/animate-ui/radix/switch";
import ErrorMessageResponse from "@/app/dashboard/_components/ErrorMessageResponse";
import { useEditMainCourse } from "./hooks/useEditMainCourse";

type Props = {
  courseData: coursesDataType;
  token: string;
};

export default function EditMainCourse({ courseData, token }: Props) {
  const {
    errors,
    handleSubmit,
    isLoading,
    isPending,
    register,
    serverError,
    setUpdate,
    submitCourseForm,
    update,
    setValue,
    departments,
  } = useEditMainCourse({ courseData, token });
  return (
    <form
      onSubmit={handleSubmit(submitCourseForm)}
      className="flex flex-col gap-4">
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

      {/* Name & code */}
      <div className="flex sm:justify-between w-full gap-4 sm:items-center sm:flex-row flex-col items-start">
        <InputForm
          disabled={!update}
          isError={errors.name != undefined}
          label="Course Name"
          placeholder="Course Name"
          register={register("name")}
          type="text"
        />
        <InputForm
          disabled={!update}
          isError={errors.code != undefined}
          label="Course Code"
          placeholder="Course Code"
          register={register("code")}
          type="text"
        />
      </div>
      <ErrorMessage error1={errors.name} error2={errors.code} />

      {/* Credit cours & Department */}

      <div className="flex sm:justify-between w-full gap-4 sm:items-center sm:flex-row flex-col items-start">
        <InputForm
          disabled={!update}
          isError={errors.credit_hours != undefined}
          label="Credit Hours"
          placeholder="Credit Hours"
          onChange={(e) => setValue("credit_hours", +e.target.value)}
          type="number"
          defaultValue={courseData.credit_hours}
        />

        {isLoading && !departments ? (
          <Skeleton className="h-10 rounded-sm w-full" />
        ) : (
          departments && (
            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm text-left" htmlFor="department">
                Department:
              </label>
              <Select
                disabled={!update}
                defaultValue={
                  departments
                    .find((d) => d.name == courseData.department.name)
                    ?.id.toString() ?? "0"
                }
                onValueChange={(e) => setValue("departmentId", +e)}>
                <SelectTrigger id="department" className="h-10 w-full">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.length > 0 ? (
                    departments.map((dep) => (
                      <SelectItem key={dep.id} value={`${dep.id}`}>
                        {dep.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem disabled value="none">
                      No Departments Found
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          )
        )}
      </div>
      <ErrorMessage error1={errors.credit_hours} error2={errors.departmentId} />

      {/* Is Elective */}
      <div className="flex flex-col gap-2">
        <p className="text-sm text-left">Is this course elective ?</p>

        <RadioGroup
          disabled={!update}
          onValueChange={(e) => setValue("isElective", e == "true")}
          defaultValue={courseData.isElective ? "true" : "false"}>
          <div className="flex items-center gap-2">
            <RadioGroupItem id="yes-label" value={"true"} />
            <label className="text-sm" htmlFor="yes-label">
              Yes
            </label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem id="no-label" value={"false"} />
            <label className="text-sm" htmlFor="no-label">
              No
            </label>
          </div>
        </RadioGroup>
      </div>

      <ErrorMessage error1={errors.isElective} />

      <Button
        disabled={isPending || !update}
        type="submit"
        variant={"mainWithShadow"}>
        {isPending ? <SmallLoader /> : "Update Course"}
      </Button>
    </form>
  );
}
