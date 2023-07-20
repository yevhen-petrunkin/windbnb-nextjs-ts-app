"use client";

import Image from "next/image";
import { IAvatarProps } from "@/interfaces";

const Avatar: React.FC<IAvatarProps> = ({ src }) => {
  return (
    <Image
      src={src || "/images/placeholder.jpg"}
      className="rounded-full"
      alt="Avatar"
      width={30}
      height={30}
    />
  );
};

export default Avatar;
