import React from "react";

export default function PersonMessageCard() {
  return (
    <div className="flex items-start gap-2 p-2 border-b border-soft-border hover:bg-Main-black cursor-pointer duration-300">
      <img
        className="w-10 h-10 object-center object-cover rounded-full"
        src="https://i.ibb.co/kV27Z5B3/user-profile.jpg"
        alt="person-image"
      />
      {/* Text */}
      <div>
        <p className="font-medium text-sm">Mr Noyan</p>
        <p className="text-sm text-low-white line-clamp-1">How Are you bro</p>
      </div>
    </div>
  );
}
