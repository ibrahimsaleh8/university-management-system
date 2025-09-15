import axios, { AxiosError } from "axios";
import { MainDomain } from "@/variables/MainDomain";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "@/redux/hooks";
import GlobalToast from "@/components/Global/GlobalToast";
import { ErrorResponseType } from "@/lib/globalTypes";
import { SubmitHandler, useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  classCreationDataType,
  classCreationSchema,
} from "@/validation/serverValidations/ClassCreationSchema";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  setClose: Dispatch<SetStateAction<boolean>>;
  token: string;
};
type teacherCoursesDataType = {
  id: string;
  course: string;
};
type CreateNewClassDataType = classCreationDataType & {
  imageUrl: string;
};
async function getCoursesForTeacher(
  id: number
): Promise<teacherCoursesDataType[] | undefined> {
  if (id == 0) return undefined;
  try {
    const res = await axios.get(`${MainDomain}/api/get/teacher-courses/${id}`);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
}

async function createNewClass(
  data: classCreationDataType & {
    imageUrl: string;
  },
  token: string
) {
  await axios.post(`${MainDomain}/api/create/class`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function uploadImageApi(file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("pathName", "students");
  const res = await axios.post(`${MainDomain}/api/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export const useAddClass = ({ setClose, token }: Props) => {
  const queryClinet = useQueryClient();
  const [classImage, setClassImage] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
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
    mutationFn: (d: { data: CreateNewClassDataType; token: string }) =>
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
        queryKey: ["teacher_classes"],
      });
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({ title: err.response.data.message, icon: "error" });
    },
  });

  const { mutate: uploadStdImage, isPending: uploadingImage } = useMutation({
    mutationKey: ["upload_std_image"],
    mutationFn: (file: File) => uploadImageApi(file),
    onError: (err: ErrorResponseType) => {
      GlobalToast({
        title: err.response.data.message ?? "Something went wrong",
        icon: "error",
      });
    },
    onSuccess: (imageUrl) => {
      if (imageUrl) {
        mutate({
          data: {
            courseOfferingId: getValues("courseOfferingId"),
            name: getValues("name"),
            teacherId: getValues("teacherId"),
            imageUrl: imageUrl.url,
          },
          token,
        });
      }
    },
  });

  const submitAddClass: SubmitHandler<classCreationDataType> = (data) => {
    if (classImage) {
      uploadStdImage(classImage);
    } else {
      mutate({
        data: {
          courseOfferingId: data.courseOfferingId,
          name: data.name,
          teacherId: data.teacherId,
          imageUrl:
            "https://res.cloudinary.com/dnriyuqpv/image/upload/v1753974406/students/amrnsz0x3ult9r0kpdxf.webp",
        },
        token,
      });
    }
  };

  return {
    setClassImage,
    submitAddClass,
    uploadingImage,
    isPending,
    loadingCourses,
    courses,
    register,
    handleSubmit,
    errors,
    setValue,
    classImage,
  };
};
