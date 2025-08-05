"use client";
import { Input } from "@/components/ui/input";
import { UseFormRegisterReturn } from "react-hook-form";
type Props = {
  label: string;
  type: string;
  placeholder: string;
  register?: UseFormRegisterReturn;
  isError: boolean;
  classes?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
export default function InputForm({
  label,
  type,
  placeholder,
  register,
  isError,
  classes,
  ...htmlAttributes
}: Props) {
  return (
    <div className={`flex flex-col gap-1.5 w-full items-start ${classes}`}>
      <label className="text-sm" htmlFor={label}>
        {label}:
      </label>
      <Input
        {...register}
        className={`h-10 w-full ${isError ? "border-red-500" : ""} `}
        id={label}
        type={type}
        {...htmlAttributes}
        placeholder={placeholder}
      />
    </div>
  );
}
