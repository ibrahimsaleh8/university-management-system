import ErrorMessage from "@/app/dashboard/_components/forms/ErrorMessage";
import InputForm from "@/app/dashboard/_components/forms/InputForm";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { GetDepartmentsQuery } from "@/lib/GetDepartmentsQuery";
import { addCourseSchema, courseDataType } from "@/validation/AddCourseSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
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
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SmallLoader from "@/components/Global/SmallLoader";
import { ErrorResponseType } from "@/lib/globalTypes";
import GlobalToast from "@/components/Global/GlobalToast";

type Props = {
  setClose: Dispatch<SetStateAction<boolean>>;
  token: string;
};

async function createNewCourse(courseData: courseDataType, token: string) {
  await axios.post(`${MainDomain}/api/create/course`, courseData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export default function FormAddCourse({ setClose, token }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<courseDataType>({
    resolver: zodResolver(addCourseSchema),
    mode: "all",
  });
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["create_new_course"],
    mutationFn: (data: { courseData: courseDataType; token: string }) =>
      createNewCourse(data.courseData, data.token),

    onError: (err: ErrorResponseType) => {
      GlobalToast({
        title: err.response.data.message,
        icon: "error",
      });
    },
    onSuccess: () => {
      setClose(true);
      queryClient.refetchQueries({ queryKey: ["get_all_courses"] });
      GlobalToast({
        title: "Course has been created successfully",
        icon: "success",
      });
    },
  });

  const submitCourseForm: SubmitHandler<courseDataType> = (data) => {
    mutate({
      courseData: data,
      token,
    });
  };

  const { departments, error, isError, isLoading } = GetDepartmentsQuery();
  if (isError && error) throw new Error(error.message);

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
              <label className="text-sm" htmlFor="department">
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
                    <>
                      <SelectItem disabled value="">
                        No Departments Found
                      </SelectItem>
                    </>
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
        <p className="text-sm">Is this course elective ?</p>

        <RadioGroup
          onValueChange={(e) => setValue("isElective", e == "true")}
          defaultValue="false">
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
