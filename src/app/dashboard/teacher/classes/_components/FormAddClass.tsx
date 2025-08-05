"use client";
import InputForm from "@/app/dashboard/_components/forms/InputForm";
import {
  classCreationDataType,
  classCreationSchema,
} from "@/validation/serverValidations/ClassCreationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorMessage from "@/app/dashboard/_components/forms/ErrorMessage";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "@/redux/hooks";
import GlobalToast from "@/components/Global/GlobalToast";
import { ErrorResponseType } from "@/lib/globalTypes";
import SmallLoader from "@/components/Global/SmallLoader";
type Props = {
  setClose: Dispatch<SetStateAction<boolean>>;
  token: string;
};
type teacherCoursesDataType = {
  id: string;
  course: string;
};
async function getCoursesForTeacher(
  id: number
): Promise<teacherCoursesDataType[] | undefined> {
  if (id == 0) return undefined;
  const res = await axios.get(`${MainDomain}/api/get/teacher-courses/${id}`);
  return res.data;
}

async function createNewClass(data: classCreationDataType, token: string) {
  await axios.post(`${MainDomain}/api/create/class`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export default function FormAddClass({ token, setClose }: Props) {
  const queryClinet = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<classCreationDataType>({
    resolver: zodResolver(classCreationSchema),
    mode: "all",
  });
  const teacherId = useAppSelector((state) => state.user.user.id);
  useEffect(() => {
    if (teacherId != 0) {
      setValue("teacherId", teacherId);
    }
  }, [setValue, teacherId]);

  // Get Courses
  const {
    data: courses,
    isError: isErrorCourses,
    error: errorCourses,
    isLoading: loadingCourses,
  } = useQuery({
    queryKey: ["teacher_courses_class", teacherId],
    queryFn: () => getCoursesForTeacher(teacherId),
  });
  if (isErrorCourses && errorCourses) throw new Error(errorCourses.message);

  // Create Class

  const { isPending, mutate } = useMutation({
    mutationKey: ["create_course"],
    mutationFn: (d: { data: classCreationDataType; token: string }) =>
      createNewClass(d.data, d.token),
    onSuccess: () => {
      setClose(true);
      GlobalToast({
        title: "class has been created successfully",
        icon: "success",
      });
      queryClinet.refetchQueries({
        queryKey: ["teacher_courses_class", teacherId],
      });
      queryClinet.refetchQueries({
        queryKey: ["teacher_classes", teacherId],
      });
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({ title: err.response.data.message, icon: "error" });
    },
  });

  const submitAddClass: SubmitHandler<classCreationDataType> = (data) => {
    mutate({ data, token });
  };

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={handleSubmit(submitAddClass)}>
      {/* Name & Department */}
      <div className="flex gap-2 justify-between items-center flex-col sm:flex-row">
        <InputForm
          isError={errors.name != undefined}
          label="Name"
          placeholder="Class Name"
          register={register("name")}
          type="text"
        />

        {/* Courses */}
        {loadingCourses && !courses ? (
          <>
            <Skeleton className="w-full h-10 rounded-md" />
          </>
        ) : (
          courses && (
            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm text-left" htmlFor="course">
                Course:
              </label>
              <Select onValueChange={(e) => setValue("courseOfferingId", e)}>
                <SelectTrigger id="course" className="w-full">
                  <SelectValue placeholder="Course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.length > 0 ? (
                    courses.map((cours) => (
                      <SelectItem key={cours.id} value={cours.id}>
                        {cours.course}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="none" disabled>
                      No Courses Found
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          )
        )}
      </div>
      <ErrorMessage error1={errors.name} error2={errors.courseOfferingId} />

      <Button disabled={isPending} variant={"mainWithShadow"} type="submit">
        {isPending ? (
          <>
            Adding....
            <SmallLoader />
          </>
        ) : (
          "Add Class"
        )}
      </Button>
    </form>
  );
}
