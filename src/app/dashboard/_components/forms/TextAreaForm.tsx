import { Textarea } from "@/components/ui/textarea";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  label: string;
  placeholder: string;
  register?: UseFormRegisterReturn;
  isError: boolean;
  classes?: string;
} & React.InputHTMLAttributes<HTMLTextAreaElement>;
export default function TextAreaForm({
  isError,
  label,
  placeholder,
  register,
  classes,
  ...htmlAttributes
}: Props) {
  return (
    <div className={`flex flex-col gap-1.5 w-full items-start ${classes}`}>
      <label className="text-sm" htmlFor={label}>
        {label}:
      </label>
      <Textarea
        {...register}
        className={`h-10 w-full min-h-32 resize-none ${
          isError ? "border-red-500" : ""
        } `}
        id={label}
        placeholder={placeholder}
        {...htmlAttributes}
      />
    </div>
  );
}
