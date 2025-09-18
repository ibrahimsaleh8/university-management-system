import { addStdDataType } from "@/app/api/create/student/route";
import GlobalToast from "@/components/Global/GlobalToast";
import { GetAllYears } from "@/lib/GetAllYears";
import { GetDepartmentsQuery } from "@/lib/GetDepartmentsQuery";
import { ErrorResponseType } from "@/lib/globalTypes";
import {
  addStudentDataType,
  addStudentSchema,
} from "@/validation/AddStudentSchema";
import { MainDomain } from "@/variables/MainDomain";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
type Props = {
  setClose: Dispatch<SetStateAction<boolean>>;
  token: string;
};

// Add New Student
async function addNewStudent(studentData: addStdDataType, token: string) {
  await axios.post(`${MainDomain}/api/create/student`, studentData, {
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

export const useAddStudent = ({ setClose, token }: Props) => {
  const [image, setImage] = useState<File | null>(null);
  const [showPass, setShowPass] = useState(false);
  const [studentData, setStudentData] = useState<addStudentDataType | null>();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<addStudentDataType>({
    resolver: zodResolver(addStudentSchema),
    mode: "onSubmit",
  });

  const { isPending, mutate: addNewStd } = useMutation({
    mutationKey: ["add_student"],
    mutationFn: (data: { stdData: addStdDataType; token: string }) =>
      addNewStudent(data.stdData, data.token),
    onSuccess: () => {
      setClose(true);
      GlobalToast({ title: "Student added success", icon: "success" });
      queryClient.refetchQueries({ queryKey: ["get_all_students"] });
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({
        title: err.response.data.message ?? "Something went wrong",
        icon: "error",
      });
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
      if (studentData) {
        addNewStd({
          stdData: { ...studentData, image: imageUrl.url },
          token,
        });
      }
    },
  });

  const handleStudentFormSubmit: SubmitHandler<addStudentDataType> = (data) => {
    if (!image) {
      GlobalToast({
        icon: "error",
        title: "Please upload image first",
      });
      return;
    }
    setStudentData(data);
    uploadStdImage(image);
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
    showPass,
    setShowPass,
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
