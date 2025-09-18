import GlobalToast from "@/components/Global/GlobalToast";
import { ErrorResponseType } from "@/lib/globalTypes";
import {
  AddTeacherDataType,
  addTeacherSchema,
} from "@/validation/AddTeacherSchema";
import { MainDomain } from "@/variables/MainDomain";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { uploadImageApi } from "./useAddStudent";
import { teacherDataTypeServer } from "@/app/api/create/teacher/route";
import { GetDepartmentsQuery } from "@/lib/GetDepartmentsQuery";
import { UpdateTeacherAndStudentImage } from "@/lib/UpdateTeacherAndStudentImage";
type Props = {
  setClose: Dispatch<SetStateAction<boolean>>;
  token: string;
};

async function addNewTeacherMutate(data: teacherDataTypeServer, token: string) {
  await axios.post(`${MainDomain}/api/create/teacher`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const useAddTeacher = ({ setClose, token }: Props) => {
  const queryClient = useQueryClient();
  const [showPass, setShowPass] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AddTeacherDataType>({
    resolver: zodResolver(addTeacherSchema),
    mode: "onSubmit",
  });

  const { mutateAsync } = useMutation({
    mutationFn: ({
      data,
      token,
    }: {
      data: teacherDataTypeServer;
      token: string;
    }) => addNewTeacherMutate(data, token),

    onError: (err: ErrorResponseType) => {
      setLoading(false);
      GlobalToast({ icon: "error", title: err.response.data.message });
    },
  });

  const { mutateAsync: uploadTeacherImage } = useMutation({
    mutationKey: ["upload_teacher_image"],
    mutationFn: (file: File) => uploadImageApi(file),
    onError: (err: ErrorResponseType) => {
      setLoading(false);

      GlobalToast({
        title: err.response.data.message ?? "Something went wrong",
        icon: "error",
      });
    },
  });

  const {
    departments,
    error: errorDepratment,
    isError: isErrorDepartment,
    isLoading: loadingDepartment,
  } = GetDepartmentsQuery();
  if (errorDepratment && isErrorDepartment)
    throw new Error(errorDepratment.message);

  const HandleForm = async (data: AddTeacherDataType) => {
    if (!image) {
      GlobalToast({
        icon: "error",
        title: "Please upload image first",
      });
      return;
    }
    setLoading(true);
    await mutateAsync({ data: { ...data, image: "" }, token });
    const teacherImage = await uploadTeacherImage(image);

    const { isSuccess } = await UpdateTeacherAndStudentImage(
      teacherImage.url,
      data.email,
      "teacher"
    ).finally(() => {
      setLoading(false);
    });
    if (isSuccess) {
      setClose(true);
      queryClient.refetchQueries({ queryKey: ["get_all_teachers"] });
      queryClient.refetchQueries({ queryKey: ["get_all_departments"] });
      GlobalToast({ icon: "success", title: "Teacher added success" });
    } else {
      GlobalToast({ icon: "error", title: "Failed" });
    }
  };

  return {
    setValue,
    register,
    handleSubmit,
    errors,
    HandleForm,
    showPass,
    setShowPass,
    image,
    setImage,
    loading,
    loadingDepartment,
    departments,
  };
};
