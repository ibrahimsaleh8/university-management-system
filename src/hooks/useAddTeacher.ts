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
type Props = {
  setClose: Dispatch<SetStateAction<boolean>>;
  token: string;
};

async function addNewTeacherMutate(data: teacherDataTypeServer, token: string) {
  try {
    await axios.post(`${MainDomain}/api/create/teacher`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
}

export const useAddTeacher = ({ setClose, token }: Props) => {
  const queryClient = useQueryClient();
  const [showPass, setShowPass] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [teacherData, setTeacherData] = useState<AddTeacherDataType | null>();

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      data,
      token,
    }: {
      data: teacherDataTypeServer;
      token: string;
    }) => addNewTeacherMutate(data, token),
    onSuccess: () => {
      setClose(true);
      GlobalToast({ icon: "success", title: "Teacher added success" });
      queryClient.refetchQueries({ queryKey: ["get_all_teachers"] });
      queryClient.refetchQueries({ queryKey: ["get_all_departments"] });
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({ icon: "error", title: err.response.data.message });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AddTeacherDataType>({
    resolver: zodResolver(addTeacherSchema),
    mode: "all",
  });

  const { mutate: uploadTeacherImage, isPending: uploadingImage } = useMutation(
    {
      mutationKey: ["upload_teacher_image"],
      mutationFn: (file: File) => uploadImageApi(file),
      onError: (err: ErrorResponseType) => {
        GlobalToast({
          title: err.response.data.message ?? "Something went wrong",
          icon: "error",
        });
      },
      onSuccess: (imageUrl) => {
        if (teacherData) {
          mutate({ data: { ...teacherData, image: imageUrl.url }, token });
        }
      },
    }
  );
  const {
    departments,
    error: errorDepratment,
    isError: isErrorDepartment,
    isLoading: loadingDepartment,
  } = GetDepartmentsQuery();
  if (errorDepratment && isErrorDepartment)
    throw new Error(errorDepratment.message);

  const HandleForm = (data: AddTeacherDataType) => {
    if (!image) {
      GlobalToast({
        icon: "error",
        title: "Please upload image first",
      });
      return;
    }
    setTeacherData(data);
    uploadTeacherImage(image);
  };

  return {
    setValue,
    register,
    handleSubmit,
    errors,
    HandleForm,
    showPass,
    setShowPass,
    isPending,
    image,
    setImage,
    uploadingImage,
    loadingDepartment,
    departments,
  };
};
