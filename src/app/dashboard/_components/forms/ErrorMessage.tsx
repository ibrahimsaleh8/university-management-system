"use client";
import { FieldError } from "react-hook-form";
type Props = {
  error1?: FieldError;
  error2?: FieldError;
};
export default function ErrorMessage({ error1, error2 }: Props) {
  return !error2 && error1 ? (
    <p className="text-sm text-red-500 text-left">* {error1.message}</p>
  ) : (
    (error2 || error2) && (
      <div className="flex sm:items-center items-start gap-4 flex-col sm:flex-row">
        {error1 && <p className="text-sm text-red-500">* {error1.message}</p>}
        {error2 && <p className="text-sm text-red-500">* {error2.message}</p>}
      </div>
    )
  );
}
