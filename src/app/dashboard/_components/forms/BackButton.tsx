"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton({ withText }: { withText: boolean }) {
  const route = useRouter();
  return (
    <Button
      className="flex w-fit items-center gap-2 bg-Second-black hover:bg-[#292727] duration-300"
      onClick={() => route.back()}>
      <ChevronLeft /> {withText ? "Back" : ""}
    </Button>
  );
}
