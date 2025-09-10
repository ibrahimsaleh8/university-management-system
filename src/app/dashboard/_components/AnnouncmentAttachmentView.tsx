import { AttachmentsFileType } from "@/lib/globalTypes";
import AnnouncmentImagePreview from "./AnnouncmentImagePreview";
import { FaFilePdf } from "react-icons/fa";

type Props = {
  url: string;
  name: string;
  type: AttachmentsFileType;
};
export default function AnnouncmentAttachmentView({ type, url, name }: Props) {
  return type == "IMAGE" ? (
    <AnnouncmentImagePreview imageUrl={url} />
  ) : (
    <a
      className="p-3 bg-Second-Card-bg hover:opacity-80 duration-300 flex flex-col gap-2 items-center justify-center rounded-md"
      target="_blank"
      href={url}>
      <FaFilePdf className="w-10 h-10" />
      <p className="capitalize text-low-white text-sm">{name}</p>
    </a>
  );
}
