import { useEffect, useState } from "react";
import { uploadImageApi } from "@/hooks/useAddStudent";
import { ErrorResponseType, RoleType } from "@/lib/globalTypes";
import { userSlice } from "@/redux/actions/UserInfo";
import { useAppDispatch } from "@/redux/hooks";
import { MainDomain } from "@/variables/MainDomain";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import GlobalToast from "@/components/Global/GlobalToast";
type Props = {
  userImage: string;
  token: string;
  role: RoleType;
};

async function updateUserImageApi(
  token: string,
  role: RoleType,
  imageUrl: string
): Promise<{ imageUrl: string }> {
  const endpointMap = {
    admin: "/api/update/profile/admin/admin-image",
    student: "/api/update/profile/student/image",
    teacher: "/api/update/profile/teacher/image",
  };

  const res = await axios.patch(
    `${MainDomain}${endpointMap[role]}`,
    { imageUrl },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return res.data;
}

export const useUpdateUserImage = ({ token, userImage, role }: Props) => {
  const dispatch = useAppDispatch();
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState(userImage);
  useEffect(() => {
    if (!uploadedImage) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(uploadedImage);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [uploadedImage]);

  const { mutateAsync: UploadImage, isPending: Uploading } = useMutation({
    mutationFn: (imageFile: File) => uploadImageApi(imageFile),
    onError: (err: ErrorResponseType) => {
      GlobalToast({
        title: err.response.data.message ?? "Something went wrong",
        icon: "error",
      });
    },
  });

  // Creat Api To save new image

  const { mutate, isPending } = useMutation({
    mutationFn: (updateParams: {
      token: string;
      role: RoleType;
      imageUrl: string;
    }) =>
      updateUserImageApi(
        updateParams.token,
        updateParams.role,
        updateParams.imageUrl
      ),
    onSuccess: (res) => {
      GlobalToast({
        icon: "success",
        title: "image updated success",
      });
      dispatch(userSlice.actions.updateImage({ image: res.imageUrl }));
      setCurrentImage(res.imageUrl);
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({
        title: err.response.data.message ?? "Something went wrong",
        icon: "error",
      });
    },
  });

  const HandleUpdateImage = async () => {
    if (uploadedImage) {
      const imageUrl = await UploadImage(uploadedImage);
      mutate({
        imageUrl: imageUrl.url,
        token,
        role,
      });
    }
  };

  return {
    HandleUpdateImage,
    isPending,
    Uploading,
    currentImage,
    preview,
    setUploadedImage,
    uploadedImage,
  };
};
