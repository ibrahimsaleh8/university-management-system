import { MainDomain } from "@/variables/MainDomain";
import axios from "axios";
import { ErrorResponseType } from "@/lib/globalTypes";
import GlobalToast from "@/components/Global/GlobalToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { GetDepartmentsQuery } from "@/lib/GetDepartmentsQuery";
import { addCourseSchema } from "@/validation/AddCourseSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseDataType } from "@/validation/AddCourseSchema";
import { Dispatch, SetStateAction } from "react";

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
export const useAddMainCourse = ({ setClose, token }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<courseDataType>({
    resolver: zodResolver(addCourseSchema),
    mode: "onSubmit",
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
      queryClient.refetchQueries({
        queryKey: ["get_active_semester_main_courses"],
      });
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

  return {
    departments,
    isLoading,
    submitCourseForm,
    isPending,
    errors,
    register,
    handleSubmit,
    setValue,
  };
};
