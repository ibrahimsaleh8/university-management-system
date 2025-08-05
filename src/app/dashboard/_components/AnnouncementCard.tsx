import React from "react";

export default function AnnouncementCard() {
  return (
    <div className="flex flex-col gap-1 p-3 bg-Second-black rounded-sm w-full">
      <div className="flex items-center justify-between">
        <p className="font-bold">Announcements Header Content</p>
        <p className="text-sm text-low-white">20/5/2004</p>
      </div>
      <p className="text-sm text-low-white">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam
        provident cumque, dicta eaque explicabo, blanditiis obcaecati voluptate
        quaerat suscipit quae corrupti numquam porro vero vel nam ratione nulla
        quisquam necessitatibus!
      </p>
    </div>
  );
}
