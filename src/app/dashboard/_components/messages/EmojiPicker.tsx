"use client";

import { Button } from "@/components/ui/button";
import {
  EmojiPickerSearch,
  EmojiPickerContent,
  EmojiPickerFooter,
  EmojiPicker,
} from "@/components/ui/emoji-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SmilePlus } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
type Props = {
  setEmoji: Dispatch<SetStateAction<string>>;
};
export default function EmojiPickerTab({ setEmoji }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="flex w-fit items-center justify-center p-4">
      <Popover onOpenChange={setIsOpen} open={isOpen}>
        <PopoverTrigger asChild>
          <Button>
            <SmilePlus className="w-5 h-5 text-main-text" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-0 ">
          <EmojiPicker
            className="h-[342px]"
            onEmojiSelect={({ emoji }) => {
              setEmoji(emoji);
            }}>
            <EmojiPickerSearch />
            <EmojiPickerContent />
            <EmojiPickerFooter />
          </EmojiPicker>
        </PopoverContent>
      </Popover>
    </main>
  );
}
