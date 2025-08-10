import { Input } from "@/components/ui/input";

type Props = {
  label: string;
  isError: boolean;
  classes?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function ExamInputForm({
  label,
  isError,
  classes,
  ...inputProps
}: Props) {
  return (
    <div className={`flex flex-col gap-1.5 w-full items-start ${classes}`}>
      <label className="text-sm text-white" htmlFor={label}>
        {label}:
      </label>
      <Input
        className={`h-10 w-full ${
          isError ? "border-red-500" : ""
        } bg-Second-Card-bg`}
        id={label}
        {...inputProps}
      />
    </div>
  );
}
