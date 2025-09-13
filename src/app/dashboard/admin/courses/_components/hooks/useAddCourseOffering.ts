import GlobalToast from "@/components/Global/GlobalToast";
import { ErrorResponseType } from "@/lib/globalTypes";
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GetAllYears } from "@/lib/GetAllYears";
import { SubmitHandler, useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useState } from "react";
import {
  courseOfferingDataType,
  courseOfferingValidationServer,
} from "@/validation/serverValidations/CourseOfferingValidationServer";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetTeacherByDepartment } from "@/lib/GetTeacherByDepartment";
import { GetActiveSemester } from "@/lib/GetActiveSemester";
import { GetActiveSemesterMainCourses } from "@/lib/GetActiveSemesterMainCourses";
import { GetAllMainCourses } from "@/lib/GetAllMainCourses";

type Props = {
  setClose: Dispatch<SetStateAction<boolean>>;
  token: string;
};

async function createNewOffering(
  offerData: courseOfferingDataType,
  token: string
) {
  await axios.post(`${MainDomain}/api/create/course-offering`, offerData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export const useAddCourseOffering = ({ setClose, token }: Props) => {
  const [hasPreRequired, setHasPreRequired] = useState(false);
  const queryClient = useQueryClient();
  const [courseDepartment, setCourseDepartment] = useState<number | null>(null);
  const { mutate, isPending } = useMutation({
    mutationKey: ["add_course_offering"],
    mutationFn: (data: { offerData: courseOfferingDataType; token: string }) =>
      createNewOffering(data.offerData, data.token),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["get_all_courses_offering"] });
      queryClient.refetchQueries({
        queryKey: ["get_active_semester_main_courses"],
      });
      queryClient.refetchQueries({
        queryKey: ["get_active_semester_courses_offers"],
      });
      setClose(true);
      GlobalToast({
        title: "Course offering has been created successfully",
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

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<courseOfferingDataType>({
    resolver: zodResolver(courseOfferingValidationServer),
    mode: "all",
  });

  const submitNewCourseOffering: SubmitHandler<courseOfferingDataType> = (
    data
  ) => {
    if (!hasPreRequired) {
      delete data.requiredCoursesId;
    }
    mutate({
      offerData: data,
      token,
    });
  };

  // **** Teachers Api ****
  const {
    error: errorTeachers,
    isError: isErrorTeachers,
    isLoading: loadingTeachers,
    teachers,
  } = GetTeacherByDepartment(courseDepartment ?? 0, courseDepartment != null);
  if (isErrorTeachers && errorTeachers) throw new Error(errorTeachers.message);

  // **** Courses Api ****
  const {
    courses,
    error: errorCourses,
    isError: isErrorCourses,
    isLoading: loadingCourses,
  } = GetActiveSemesterMainCourses();
  if (isErrorCourses && errorCourses) throw new Error(errorCourses.message);
  // **** Semesters Api ****
  const {
    error: errorSemester,
    isError: isErrorSemester,
    isLoading: loadingSemester,
    semesterData,
  } = GetActiveSemester();
  if (isErrorSemester && errorSemester) throw new Error(errorSemester.message);

  // **** Academic Years Api ****
  const {
    error: errorYears,
    isError: isErrorYears,
    isLoading: loadingYears,
    years,
  } = GetAllYears();
  if (isErrorYears && errorYears) throw new Error(errorYears.message);
  // **** Main Courses  Api ****
  const {
    courses: mainCourses,
    error,
    isError,
    isLoading: loadingMainCourses,
  } = GetAllMainCourses();
  if (error && isError) throw new Error(error.message);

  return {
    years,
    loadingYears,
    loadingSemester,
    semesterData,
    loadingCourses,
    courses,
    loadingTeachers,
    teachers,
    submitNewCourseOffering,
    register,
    handleSubmit,
    setValue,
    watch,
    errors,
    isPending,
    setHasPreRequired,
    hasPreRequired,
    setCourseDepartment,
    mainCourses,
    loadingMainCourses,
  };
};
