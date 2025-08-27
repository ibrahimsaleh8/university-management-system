import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, MoreHorizontal } from "lucide-react";
import { ReactNode } from "react";
type Props = {
  components: ReactNode[];
  verticalIcon?: boolean;
};
export default function OperationsDropdown({
  components,
  verticalIcon,
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="cursor-pointer hover:bg-soft-border min-w-7 min-h-7 p-1 duration-300 rounded-md hover:text-main-text"
        asChild>
        {verticalIcon ? (
          <EllipsisVertical className="w-5 h-5" />
        ) : (
          <MoreHorizontal className="w-5 h-5" />
        )}
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
