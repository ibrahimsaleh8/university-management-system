import InputForm from "@/app/dashboard/_components/forms/InputForm";
import TextAreaForm from "@/app/dashboard/_components/forms/TextAreaForm";
import GlobalToast from "@/components/Global/GlobalToast";
import SmallLoader from "@/components/Global/SmallLoader";
import { Button } from "@/components/ui/button";
import { ErrorResponseType } from "@/lib/globalTypes";
import {
  AnnouncementUpdateSchema,
  annUpdateDataType,
} from "@/validation/EditAnnouncementSchema";
import { MainDomain } from "@/variables/MainDomain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
type Props = {
  title: string;
  annId: string;
  content: string;
  token: string;
  className: string;
  setClose: Dispatch<SetStateAction<boolean>>;
};
async function updateAnnouncmet(
  id: string,
  data: annUpdateDataType,
  token: string
) {
  await axios.put(`${MainDomain}/api/update/announcement/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
export default function UpdateAnn({
  annId,
  content,
  title,
  token,
  className,
  setClose,
}: Props) {
  const [annTitle, setAnnTitle] = useState(title ?? "");
  const [annContent, setAnnContent] = useState(content ?? "");
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["update_ann", annId],
    mutationFn: (data: {
      id: string;
      data: annUpdateDataType;
      token: string;
    }) => updateAnnouncmet(data.id, data.data, data.token),
    onSuccess: () => {
      setClose(true);
      queryClient.refetchQueries({
        queryKey: ["class_announcment", className],
      });
      GlobalToast({
        title: "Announcement has been updated successfully",
        icon: "success",
      });
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({ title: err.response.data.message, icon: "error" });
    },
  });

  const HandleEdit = () => {
    const data: annUpdateDataType = { title: annTitle, content: annContent };
    const validation = AnnouncementUpdateSchema.safeParse(data);

    if (!validation.success) {
      GlobalToast({
        title: validation.error.errors[0].message,
        icon: "error",
      });
      return;
    }
    mutate({ data, id: annId, token });
  };
  return (
    <div className="flex flex-col gap-3">
      <InputForm
        onChange={(e) => setAnnTitle(e.target.value)}
        isError={false}
        label="Title"
        placeholder="Title"
        type="text"
        defaultValue={annTitle}
      />

      <TextAreaForm
        onChange={(e) => setAnnContent(e.target.value)}
        isError={false}
        label="Content"
        defaultValue={annContent}
        placeholder="Content"
      />

      <Button
        disabled={isPending}
        onClick={HandleEdit}
        className="mt-2"
        variant={"mainWithShadow"}>
        {isPending ? (
          <>
            Updating... <SmallLoader />
          </>
        ) : (
          "Update"
        )}
      </Button>
    </div>
  );
}
