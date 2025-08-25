import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorResponseType } from "@/lib/globalTypes";
import GlobalToast from "@/components/Global/GlobalToast";
import { GetDepartmentsQuery } from "@/lib/GetDepartmentsQuery";
import { addCourseSchema, courseDataType } from "@/validation/AddCourseSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { coursesDataType } from "@/lib/GetAllMainCourses";
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";

type Props = {
  courseData: coursesDataType;
  token: string;
};
type UpdateCourseDataType = {
  token: string;
  courseData: courseDataType;
  courseId: number;
};

async function UpdateMainCourse({
  courseData,
  courseId,
  token,
}: UpdateCourseDataType) {
  await axios.put(
    `${MainDomain}/api/update/main-course/${courseId}`,
    courseData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
export const useEditMainCourse = ({ courseData, token }: Props) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const [update, setUpdate] = useState(false);

  const { isPending, mutate } = useMutation({
    mutationFn: (params: UpdateCourseDataType) => UpdateMainCourse(params),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["get_all_courses"] });
      GlobalToast({
        title: "Course has been updated successfully",
        icon: "success",
      });
    },
    onError: (err: ErrorResponseType) => {
      setServerError(err.response?.data?.message ?? "Something went wrong");
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<courseDataType>({
    resolver: zodResolver(addCourseSchema),
    mode: "all",
    defaultValues: {
      code: courseData.code,
      credit_hours: courseData.credit_hours,
      isElective: courseData.isElective,
      name: courseData.name,
    },
  });

  const submitCourseForm: SubmitHandler<courseDataType> = (data) => {
    mutate({
      courseData: data,
      courseId: courseData.id,
      token,
    });
  };

  const { departments, error, isError, isLoading } = GetDepartmentsQuery();
  if (isError && error) throw new Error(error.message);

  useEffect(() => {
    if (departments && departments.length > 0) {
      setValue(
        "departmentId",
        departments.find((d) => d.name == courseData.department.name)?.id ?? 0
      );
    }
  }, [courseData.department.name, departments, setValue]);

  return {
    isLoading,
    submitCourseForm,
    errors,
    register,
    handleSubmit,
    isPending,
    update,
    setUpdate,
    serverError,
    setValue,
    departments,
  };
};
