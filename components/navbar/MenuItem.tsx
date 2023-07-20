"use client";

import { IMenuItemProps } from "@/interfaces";

const MenuItem: React.FC<IMenuItemProps> = ({ onClick, label }) => {
  return (
    <li
      className={`px-4 py-3 hover:bg-neutral-100 transition font-semibold ${
        label === "Log Out" && "border-t-[1px] border-neutral-200"
      }`}
      onClick={onClick}
    >
      {label}
    </li>
  );
};

export default MenuItem;
