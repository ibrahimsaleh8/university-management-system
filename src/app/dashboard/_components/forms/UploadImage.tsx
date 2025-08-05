"use client";

import { MotionEffect } from "@/components/animate-ui/effects/motion-effect";
import { ImageUp } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
type Props = {
  setImage: Dispatch<SetStateAction<File | null>>;
  image: File | null;
  title: string;
  imageurl?: string;
};
export default function UploadImage({
  image,
  setImage,
  title,
  imageurl,
}: Props) {
  return (
    <div className="sm:w-96 w-full flex items-center gap-3">
      <label
        className="sm:text-sm text-xs cursor-pointer flex flex-col gap-1"
        htmlFor="image-upload">
        {title}:
        <div className="w-full flex flex-col h-10 items-center justify-center rounded-sm border border-dashed gap-1 bg-Second-black">
          <ImageUp className="w-6 h-6" />
        </div>
      </label>

      <input
        onChange={(e) => {
          if (e.target.files) {
            setImage(e.target.files?.item(0));
          }
        }}
        type="file"
        id="image-upload"
        className="hidden"
      />
      {imageurl && !image ? (
        <MotionEffect
          fade
          blur="10px"
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          inView>
          <img
            className="w-12 h-12 mt-5 object-center object-cover rounded-md"
            alt="Student Image"
            src={imageurl}
          />
        </MotionEffect>
      ) : image ? (
        <MotionEffect
          fade
          blur="10px"
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          inView>
          <img
            className="w-12 h-12 mt-5 object-center object-cover rounded-md"
            alt="Student Image"
            src={URL.createObjectURL(image)}
          />
        </MotionEffect>
      ) : (
        <div className="w-12 h-12 mt-5 bg-Second-black rounded-md"></div>
      )}
    </div>
  );
}
