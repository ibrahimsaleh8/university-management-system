import GlobalToast from "@/components/Global/GlobalToast";
import { uploadImageApi } from "@/hooks/useAddStudent";
import { GetAllYears } from "@/lib/GetAllYears";
import { GetDepartmentsQuery } from "@/lib/GetDepartmentsQuery";
import { ErrorResponseType } from "@/lib/globalTypes";
import {
  editStudentDataType,
  editStudentSchema,
} from "@/validation/EditStudentSchema";
import { MainDomain } from "@/variables/MainDomain";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
type Props = {
  setClose: Dispatch<SetStateAction<boolean>>;
  token: string;
  studentDeafultData: editStudentDataType;
};

// Add New Student
async function editStudentApi(studentData: editStudentDataType, token: string) {
  await axios.patch(
    `${MainDomain}/api/update/student/${studentData.student_id}`,
    studentData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export const useEditStudent = ({
  setClose,
  token,
  studentDeafultData,
}: Props) => {
  const [image, setImage] = useState<File | null>(null);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<editStudentDataType>({
    resolver: zodResolver(editStudentSchema),
    mode: "all",
    defaultValues: { ...studentDeafultData },
  });

  const { isPending, mutate: editStd } = useMutation({
    mutationFn: (data: { studentData: editStudentDataType; token: string }) =>
      editStudentApi(data.studentData, data.token),
    onSuccess: () => {
      setClose(true);
      GlobalToast({ title: "Student Updated Success", icon: "success" });
      queryClient.refetchQueries({ queryKey: ["get_all_student"] });
      queryClient.refetchQueries({
        queryKey: ["student_data_details", studentDeafultData.student_id],
      });
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({
        title: err.response.data.message ?? "Something went wrong",
        icon: "error",
      });
    },
  });

  const { mutateAsync: uploadStdImage, isPending: uploadingImage } =
    useMutation({
      mutationKey: ["upload_std_image"],
      mutationFn: (file: File) => uploadImageApi(file),
      onError: (err: ErrorResponseType) => {
        GlobalToast({
          title: err.response.data.message ?? "Something went wrong",
          icon: "error",
        });
      },
    });

  const handleStudentFormSubmit: SubmitHandler<editStudentDataType> = async (
    data
  ) => {
    if (image) {
      const newImage = await uploadStdImage(image);
      editStd({ studentData: { ...data, image: newImage.url }, token });
    } else {
      editStd({ studentData: data, token });
    }
  };

  // ****** Department api ******
  const {
    departments,
    error: errorDepratment,
    isError: isErrorDepartment,
    isLoading: loadingDepartment,
  } = GetDepartmentsQuery();
  if (errorDepratment && isErrorDepartment)
    throw new Error(errorDepratment.message);

  // ****** Academic Years api ******
  const {
    error: errorYears,
    isError: isErrorYears,
    isLoading: loadingYears,
    years,
  } = GetAllYears();
  if (errorYears && isErrorYears) throw new Error(errorYears.message);

  return {
    handleStudentFormSubmit,
    isPending,
    errors,
    register,
    handleSubmit,
    setValue,
    loadingDepartment,
    departments,
    loadingYears,
    years,
    image,
    setImage,
    uploadingImage,
  };
};
