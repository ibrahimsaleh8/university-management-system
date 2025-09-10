import cloudinary from "@/lib/Cloudnairy";
import { NextRequest, NextResponse } from "next/server";
import type { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";

type FormDataFile = Blob & { name?: string };

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as FormDataFile | null;
    const pathName = (formData.get("pathName") as string) || "uploads";

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ message: "Invalid file" }, { status: 400 });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const uploadResponse = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: pathName, resource_type: "auto", access_mode: "public" },
          (
            error: UploadApiErrorResponse | undefined,
            result: UploadApiResponse | undefined
          ) => {
            if (error) reject(error);
            else if (result) resolve(result);
            else reject(new Error("Unknown Cloudinary error"));
          }
        );
        uploadStream.end(fileBuffer);
      }
    );

    return NextResponse.json(
      {
        url: uploadResponse.secure_url,
        fileType: uploadResponse.resource_type,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Uploading Error:", error);
    return NextResponse.json(
      { message: "Uploading Error", error: (error as Error).message },
      { status: 500 }
    );
  }
}
