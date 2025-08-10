import { Textarea } from "@/components/ui/textarea";

type Props = {
  label: string;
  isError?: boolean;
  classes?: string;
  id?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function ExamTextAreaForm({
  isError = false,
  label,
  placeholder,
  classes,
  id,
  ...htmlAttributes
}: Props) {
  const textareaId = id || label.replace(/\s+/g, "-").toLowerCase();

  return (
    <div
      className={`flex flex-col gap-1.5 w-full items-start ${classes || ""}`}>
      <label className="text-sm" htmlFor={textareaId}>
        {label}:
      </label>
      <Textarea
        className={`w-full min-h-32 resize-none bg-Second-Card-bg ${
          isError
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : ""
        }`}
        id={textareaId}
        placeholder={placeholder}
        {...htmlAttributes}
      />
    </div>
  );
}
