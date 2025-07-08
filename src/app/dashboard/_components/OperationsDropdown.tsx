import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { ReactNode } from "react";
type Props = {
  components: ReactNode[];
};
export default function OperationsDropdown({ components }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="cursor-pointer hover:text-main-text"
        asChild>
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-fit bg-Second-black text-white border-soft-border flex flex-col gap-1">
        {components.map((c, i) => (
          <DropdownMenuLabel className="w-full p-1" key={i}>
            {c}
          </DropdownMenuLabel>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
