"use client";
import errorImage from "@images/errorImage.webp";
import Image from "next/image";
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col gap-1 items-center justify-center text-center">
      <Image
        src={errorImage}
        alt="Error Image"
        width={1000}
        height={1000}
        className="w-96"
        priority
      />
      <div className="flex flex-col gap-3">
        <h2 className="font-medium text-xl text-red-500">
          Something went wrong!
        </h2>
        <p className="text-lg">{error.message}</p>
        <button
          onClick={() => reset()}
          className="px-4 py-1.5 bg-Second-black rounded-md cursor-pointer">
          Try again
        </button>
      </div>
    </div>
  );
}
