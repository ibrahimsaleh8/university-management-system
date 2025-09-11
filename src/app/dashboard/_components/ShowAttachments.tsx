import { AttachemntsFilesDataType } from "../teacher/classes/_components/TeacherClassAnnouncments";
import AnnouncmentAttachmentView from "./AnnouncmentAttachmentView";

export default function ShowAttachments({
  attachments,
}: {
  attachments: AttachemntsFilesDataType[];
}) {
  return (
    attachments.length > 0 && (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4 flex-wrap">
          {attachments
            .filter((att) => att.type == "PDF")
            .map((att) => (
              <AnnouncmentAttachmentView
                key={att.id}
                type={att.type}
                url={att.url}
                name={att.name}
              />
            ))}
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          {attachments
            .filter((att) => att.type == "IMAGE")
            .map((att) => (
              <AnnouncmentAttachmentView
                key={att.id}
                type={att.type}
                url={att.url}
                name={att.name}
              />
            ))}
        </div>
      </div>
    )
  );
}
