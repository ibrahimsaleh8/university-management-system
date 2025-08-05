import { Textarea } from "@/components/ui/textarea";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import EmojiPickerTab from "./EmojiPicker";
type Props = {
  setFinalText: Dispatch<SetStateAction<string>>;
  moreClasse?: string;
  text: string;
  fullWidth?: boolean;
  bgColor?: string;
  maxHeight?: string;
};
export default function TextAreaWithEmoji({
  moreClasse,
  setFinalText,
  text,
  fullWidth,
  bgColor,
  maxHeight,
}: Props) {
  const messageTxt = useRef<HTMLTextAreaElement>(null);
  const [emoji, setEmoji] = useState("");
  const classes = fullWidth
    ? "w-full"
    : "w-full max-w-[88%] sm:max-w-[94%] xl:max-w-[95%]";
  // Emoji Handler
  useEffect(() => {
    if (emoji && messageTxt.current) {
      messageTxt.current.value += emoji;
      setFinalText((pre) => pre + emoji);
      setEmoji("");
    }
  }, [emoji, setFinalText]);
  return (
    <div className={`relative ${classes} ${moreClasse ? moreClasse : ""}`}>
      <Textarea
        value={text}
        onChange={(e) => setFinalText(e.target.value)}
        ref={messageTxt}
        className={`${bgColor ? bgColor : "bg-black"} resize-none ${
          maxHeight ? maxHeight : "max-h-28"
        }  w-full`}
        placeholder="Message"
      />
      <div className="absolute right-1 bottom-[-5px]">
        <EmojiPickerTab setEmoji={setEmoji} />
      </div>
    </div>
  );
}
