import SmallLoader from "@/components/Global/SmallLoader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { useEditTeacherProfileAndBio } from "./Hooks/useEditTeacherProfileAndBio";

type Props = {
  token: string;
  image: string;
  bio: string | null;
  setCurrentImage: Dispatch<SetStateAction<string>>;
  setClose: Dispatch<SetStateAction<boolean>>;
};

export default function EditTeacherProfileForm({
  image,
  setCurrentImage,
  bio,
  token,
  setClose,
}: Props) {
  const {
    HandleUpdate,
    isPending,
    Uploading,
    preview,
    setUploadedImage,
    bioContent,
  } = useEditTeacherProfileAndBio({
    token,
    setClose,
    image,
    setCurrentImage,
  });
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 w-full flex-col sm:flex-row ">
        <div className="w-28 h-28 rounded-full flex items-center justify-center">
          {preview ? (
            <div className="w-28 h-28 relative">
              <button
                onClick={() => setUploadedImage(null)}
                className="w-6 h-6 flex items-center justify-center cursor-pointer bg-red-600 absolute right-0  top-0 rounded-full">
                <X className="w-4 h-4 text-white" />
              </button>
              <img
                alt="Uploaded image"
                className="w-full h-full object-cover object-center rounded-full"
                src={preview}
              />
            </div>
          ) : (
            <Image
              src={image}
              alt="Admin Image"
              width={1000}
              height={1000}
              className="w-28 h-28 rounded-full object-cover object-center mx-auto"
            />
          )}
        </div>

        <Input
          onChange={(e) => {
            if (e.target.files) {
              setUploadedImage(e.target.files[0]);
              e.target.value = "";
            }
          }}
          accept="image/*"
          type="file"
          className="hidden"
          id="upoload-img"
        />

        <div className="flex items-center justify-center gap-2 flex-col sm:flex-1 w-full sm:h-full h-24">
          <label
            htmlFor="upoload-img"
            className="flex items-center flex-col justify-center gap-2 w-full h-full border border-dashed border-soft-border cursor-pointer text-sm duration-300 px-4  py-2 rounded-sm">
            <Upload className="w-4 h-4" />
            Upload New Image
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm" htmlFor="bio">
          Biography:
        </label>
        <Textarea
          ref={bioContent}
          className="h-32"
          placeholder="Biography"
          id="bio"
          defaultValue={bio ?? ""}
        />
      </div>

      <Button
        disabled={isPending || Uploading}
        onClick={HandleUpdate}
        variant={"mainWithShadow"}>
        {Uploading ? (
          <>
            <SmallLoader /> Uploading...
          </>
        ) : isPending ? (
          <>
            <SmallLoader /> Updateing...
          </>
        ) : (
          "Save"
        )}
      </Button>
    </div>
  );
}
