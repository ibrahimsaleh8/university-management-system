import ErrorMessage from "@/app/dashboard/_components/forms/ErrorMessage";
import InputForm from "@/app/dashboard/_components/forms/InputForm";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Dispatch, SetStateAction } from "react";
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
import SmallLoader from "@/components/Global/SmallLoader";
import { useAddMainCourse } from "./hooks/useAddMainCourse";

type Props = {
  setClose: Dispatch<SetStateAction<boolean>>;
  token: string;
};

export default function FormAddCourse({ setClose, token }: Props) {
  const {
    departments,
    errors,
    handleSubmit,
    isLoading,
    isPending,
    register,
    setValue,
    submitCourseForm,
  } = useAddMainCourse({ setClose, token });
  return (
    <form
      onSubmit={handleSubmit(submitCourseForm)}
      className="flex flex-col gap-4">
      {/* Name & code */}
      <div className="flex sm:justify-between w-full gap-4 sm:items-center sm:flex-row flex-col items-start">
        <InputForm
          isError={errors.name != undefined}
          label="Course Name"
          placeholder="Course Name"
          register={register("name")}
          type="text"
        />
        <InputForm
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
          isError={errors.credit_hours != undefined}
          label="Credit Hours"
          placeholder="Credit Hours"
          onChange={(e) => setValue("credit_hours", +e.target.value)}
          type="number"
        />

        {isLoading && !departments ? (
          <Skeleton className="h-10 rounded-sm w-full" />
        ) : (
          departments && (
            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm text-left" htmlFor="department">
                Department:
              </label>
              <Select onValueChange={(e) => setValue("departmentId", +e)}>
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
          onValueChange={(e) => setValue("isElective", e == "true")}
          defaultValue="false">
          <div className="flex items-center gap-2">
            <RadioGroupItem id="yes-label" value={"true"} />
            <label className="text-sm " htmlFor="yes-label">
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

      <Button disabled={isPending} type="submit" variant={"mainWithShadow"}>
        {isPending ? (
          <>
            Adding.. <SmallLoader />
          </>
        ) : (
          "Add Course"
        )}
      </Button>
    </form>
  );
}
