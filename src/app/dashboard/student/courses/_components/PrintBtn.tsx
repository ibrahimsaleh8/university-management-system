import { Button } from "@/components/ui/button";
import { ImPrinter } from "react-icons/im";

export default function PrintBtn() {
  return (
    <Button className="bg-white text-black rounded-md hover:bg-low-white duration-300">
      <ImPrinter className="!w-4 !h-4" />
    </Button>
  );
}
