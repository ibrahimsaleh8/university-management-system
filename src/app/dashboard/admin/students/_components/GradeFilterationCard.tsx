import { RadioGroupItem } from "@/components/animate-ui/radix/radio-group";
type Props = {
  label: string;
  value: string;
};
export default function GradeFilterationCard({ label, value }: Props) {
  return (
    <label
      htmlFor={label}
      className="flex border gradient-black-btn border-soft-border cursor-pointer items-center gap-2 px-4 bg-Second-black p-1.5 rounded-md text-sm">
      <RadioGroupItem id={label} value={value} className="cursor-pointer" />
      {label}
    </label>
  );
}
