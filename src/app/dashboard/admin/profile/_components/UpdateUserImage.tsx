"use client";
import SmallLoader from "@/components/Global/SmallLoader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useUpdateAdminImage } from "./hooks/useUpdateAdminImage";
type Props = {
  userImage: string;
  token: string;
};
export default function UpdateUserImage({ userImage, token }: Props) {
  const {
    HandleUpdateImage,
    isPending,
    Uploading,
    currentImage,
    preview,
    setUploadedImage,
  } = useUpdateAdminImage({ userImage, token });
  return (
    <div className="flex flex-col items-center justify-center gap-3">
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

      <div className="flex items-center gap-2">
        <label
          htmlFor="upoload-img"
          className="bg-blue-500 cursor-pointer text-sm duration-300 hover:bg-blue-600 px-4 flex items-center gap-2 py-2  h-9 rounded-sm">
          <Upload className="w-4 h-4" />
          Upload Image
        </label>
        <Button
          onClick={HandleUpdateImage}
          disabled={Uploading || isPending}
          style={{ transition: "0.3s" }}
          className="bg-main-text text-black hover:bg-main-text hover:opacity-80">
          {Uploading ? (
            <>
              Uploading... <SmallLoader />
            </>
          ) : isPending ? (
            <>
              Updateing... <SmallLoader />
            </>
          ) : (
            "Save image"
          )}
        </Button>
      </div>
    </div>
  );
}
