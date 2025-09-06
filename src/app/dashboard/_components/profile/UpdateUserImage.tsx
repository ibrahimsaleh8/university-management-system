"use client";
import SmallLoader from "@/components/Global/SmallLoader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Upload, X } from "lucide-react";
import Image from "next/image";
import { useUpdateUserImage } from "./Hooks/useUpdateUserImage";
import { RoleType } from "@/lib/globalTypes";
type Props = {
  userImage: string;
  token: string;
  role: RoleType;
};
export default function UpdateUserImage({ userImage, token, role }: Props) {
  const {
    HandleUpdateImage,
    isPending,
    Uploading,
    currentImage,
    preview,
    setUploadedImage,
    uploadedImage,
  } = useUpdateUserImage({ userImage, token, role });

  return (
    <div className="flex items-center gap-3 flex-wrap">
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
            src={currentImage}
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

      <div className="flex items-start gap-2 flex-col">
        <label
          htmlFor="upoload-img"
          className="bg-blue-500 cursor-pointer text-sm duration-300 hover:bg-blue-600 px-4 flex items-center gap-2 py-2  h-9 rounded-sm">
          <Upload className="w-4 h-4" />
          Change Image
        </label>
        <Button
          onClick={HandleUpdateImage}
          disabled={Uploading || isPending || !uploadedImage}
          style={{ transition: "0.3s" }}
          className="bg-transparent text-main-text border border-main-text hover:bg-main-text hover:text-black w-full">
          {Uploading ? (
            <>
              Uploading... <SmallLoader color="white" />
            </>
          ) : isPending ? (
            <>
              Updateing... <SmallLoader color="white" />
            </>
          ) : (
            <>
              <Save />
              Save image
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
