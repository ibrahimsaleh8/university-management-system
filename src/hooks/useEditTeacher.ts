import GlobalToast from "@/components/Global/GlobalToast";
import { ErrorResponseType } from "@/lib/globalTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadImageApi } from "./useAddStudent";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  EditTeacherDataType,
  editTeacherSchema,
} from "@/validation/EditTeacherSchema";
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";
type TeacherDataType = EditTeacherDataType & { image: string };
type Props = {
  token: string;
  teacherData: TeacherDataType;
  setIsClose: Dispatch<SetStateAction<boolean>>;
};

async function UpdateTeacherApi(data: TeacherDataType, token: string) {
  await axios.patch(
    `${MainDomain}/api/update/teacher/${data.teacher_id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export const useEditTeacher = ({ teacherData, token, setIsClose }: Props) => {
  const [image, setImage] = useState<File | null>(null);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<EditTeacherDataType>({
    resolver: zodResolver(editTeacherSchema),
    mode: "all",
    defaultValues: {
      address: teacherData.address,
      email: teacherData.email,
      first_name: teacherData.first_name,
      gender: teacherData.gender,
      last_name: teacherData.last_name,
      phone: teacherData.phone,
      qualification: teacherData.qualification,
      teacher_id: teacherData.teacher_id,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (p: { data: TeacherDataType; token: string }) =>
      UpdateTeacherApi(p.data, p.token),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["teacher_data_details", teacherData.teacher_id],
      });
      queryClient.refetchQueries({
        queryKey: ["get_all_teachers"],
      });
      GlobalToast({
        title: "Teacher Updated Success",
        icon: "success",
      });
      setIsClose(true);
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({
        title: err.response.data.message ?? "Something went wrong",
        icon: "error",
      });
    },
  });

  const { mutateAsync: uploadTeacherImage, isPending: uploadingImage } =
    useMutation({
      mutationKey: ["upload_teacher_image"],
      mutationFn: (file: File) => uploadImageApi(file),
      onError: (err: ErrorResponseType) => {
        GlobalToast({
          title: err.response.data.message ?? "Something went wrong",
          icon: "error",
        });
      },
    });
  const submitEditTeacher: SubmitHandler<EditTeacherDataType> = async (
    formData
  ) => {
    if (image) {
      const imageResult = await uploadTeacherImage(image);
      mutate({
        token,
        data: { ...formData, image: imageResult.url },
      });
    } else {
      mutate({
        token,
        data: { ...formData, image: teacherData.image },
      });
    }
  };
  return {
    submitEditTeacher,
    uploadingImage,
    setValue,
    getValues,
    errors,
    register,
    handleSubmit,
    setImage,
    image,
    isPending,
  };
};
