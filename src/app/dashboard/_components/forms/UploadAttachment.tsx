"use client";
import { MainDomain } from "@/variables/MainDomain";
import axios, { AxiosError } from "axios";
import { FileText, FileUp, TriangleAlert, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
type Props = {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
};
export async function UploadAttachmentApi(
  file: File
): Promise<{ url: string; fileType: "image" | "video" | "raw" | "auto" }> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("pathName", "students");
  try {
    const res = await axios.post(
      `${MainDomain}/api/upload/attachment`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
}
export default function UploadAttachment({ files, setFiles }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div className="w-full flex flex-col items-center justify-center gap-3 border border-dashed border-soft-border p-5 rounded-md">
        <FileUp className="w-14 h-14 text-low-white" />
        <label
          htmlFor="upload-file"
          className="px-4 py-1.5 bg-blue-500 hover:opacity-85 duration-300 text-sm rounded-sm cursor-pointer">
          Choose file
        </label>
        <input
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setFiles([
                ...files,
                ...Array.from(e.target.files).filter(
                  (file) => !files.some((f) => f.name === file.name)
                ),
              ]);
            }
          }}
          type="file"
          className="hidden"
          id="upload-file"
          multiple
          accept="image/*,.pdf"
        />
        <p className="text-low-white text-sm">Upload new attachment</p>
        <p className="text-low-white text-sm flex items-center gap-1">
          <TriangleAlert className="w-4 h-4 text-orange-300" />
          Only images and pdf Files
        </p>
      </div>
      {files && files.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="text-low-white font-medium">
            {files.length} File{files.length > 1 ? "s" : ""} Selected
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            {files.map((fi, i) => (
              <div
                key={i}
                className="relative flex flex-col items-center gap-1 bg-Second-black w-fit p-3 rounded-md text-center">
                <button
                  onClick={() =>
                    setFiles((prev) => prev.filter((_, idx) => idx !== i))
                  }
                  type="button"
                  className="w-5 h-5 bg-red-500 hover:opacity-85 duration-300 text-white absolute right-[-8px] top-[-5px] cursor-pointer rounded-full flex items-center justify-center">
                  <X className="w-4 h-4" />
                </button>
                <FileText className="w-5 h-5" />
                <p
                  title={fi.name}
                  className="text-xs text-low-white w-40 line-clamp-1">
                  {fi.name}
                </p>
                <p className="text-xs text-low-white">
                  {`${(fi.size / 1048576).toFixed(3)} MB`}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
