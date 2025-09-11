import Image from "next/image";
import { FaFilePdf } from "react-icons/fa";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AttachemntsFilesDataType } from "./TeacherClassAnnouncments";
import { Dispatch, SetStateAction } from "react";
type Props = {
  attachments: AttachemntsFilesDataType[];
  deleteAttachments: { id: string }[];
  setDeleteAttachments: Dispatch<SetStateAction<{ id: string }[]>>;
};
export default function EditeAttachments({
  attachments,
  deleteAttachments,
  setDeleteAttachments,
}: Props) {
  return (
    attachments.length > 0 &&
    attachments
      .filter((att) => !deleteAttachments.find((e) => e.id == att.id))
      .map((att) => (
        <div className="flex items-center gap-3 w-fit relative" key={att.id}>
          <Button
            onClick={() => {
              setDeleteAttachments((pre) => [...pre, { id: att.id }]);
            }}
            variant={"destructive"}
            className="w-8 h-8 flex items-center justify-center absolute left-0 top-0 z-10">
            <Trash2 className="w-4 h-4 text-white" />
          </Button>
          {att.type == "PDF" ? (
            <a
              className="p-3 bg-Second-Card-bg hover:opacity-80 duration-300 flex flex-col gap-2 items-center justify-center rounded-md"
              target="_blank"
              href={att.url}>
              <FaFilePdf className="w-10 h-10" />
              <p className="text-low-white text-sm">{att.name}</p>
            </a>
          ) : (
            <Image
              alt="Placeholder image"
              className="w-64 object-cover object-center rounded-2xl"
              height={800}
              src={att.url}
              unoptimized
              width={1200}
            />
          )}
        </div>
      ))
  );
}
