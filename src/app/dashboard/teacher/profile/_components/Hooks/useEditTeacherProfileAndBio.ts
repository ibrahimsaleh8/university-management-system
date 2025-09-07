import GlobalToast from "@/components/Global/GlobalToast";
import { uploadImageApi } from "@/hooks/useAddStudent";
import { ErrorResponseType } from "@/lib/globalTypes";
import { userSlice } from "@/redux/actions/UserInfo";
import { useAppDispatch } from "@/redux/hooks";
import { MainDomain } from "@/variables/MainDomain";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

async function UpdateImageAndBioApi(
  token: string,
  imageUrl: string,
  bio: string | null
): Promise<{ imageUrl: string }> {
  const res = await axios.patch(
    `${MainDomain}/api/update/profile/teacher/image-and-bio`,
    {
      imageUrl,
      bio,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}

type Props = {
  token: string;
  image: string;
  setCurrentImage: Dispatch<SetStateAction<string>>;
  setClose: Dispatch<SetStateAction<boolean>>;
};
export const useEditTeacherProfileAndBio = ({
  image,
  setClose,
  setCurrentImage,
  token,
}: Props) => {
  const dispatch = useAppDispatch();
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const bioContent = useRef<HTMLTextAreaElement | null>(null);
  const route = useRouter();
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

  const { mutate: updateData, isPending } = useMutation({
    mutationFn: (updateParams: {
      token: string;
      imageUrl: string;
      bio: string | null;
    }) =>
      UpdateImageAndBioApi(
        updateParams.token,
        updateParams.imageUrl,
        updateParams.bio
      ),
    onSuccess: (res) => {
      GlobalToast({
        icon: "success",
        title: "Data updated success",
      });
      dispatch(userSlice.actions.updateImage({ image: res.imageUrl }));
      setCurrentImage(res.imageUrl);
      setClose(true);
      route.refresh();
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({
        title: err.response.data.message ?? "Something went wrong",
        icon: "error",
      });
    },
  });

  const HandleUpdate = async () => {
    const bioText = bioContent.current?.value as string;
    if (bioText.trim().length == 0 && !uploadedImage) return;
    if (uploadedImage && bioText) {
      const newImage = await UploadImage(uploadedImage);
      updateData({
        imageUrl: newImage.url,
        bio: bioText,
        token,
      });
    } else if (bioText && !uploadedImage) {
      updateData({
        imageUrl: image,
        bio: bioText,
        token,
      });
    } else if (!bioText && uploadedImage) {
      const newImage = await UploadImage(uploadedImage);
      updateData({
        imageUrl: newImage.url,
        bio: null,
        token,
      });
    }
  };
  return {
    HandleUpdate,
    isPending,
    Uploading,
    preview,
    setUploadedImage,
    bioContent,
  };
};
