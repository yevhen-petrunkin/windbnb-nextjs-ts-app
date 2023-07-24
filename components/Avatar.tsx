"use client";

import { IAvatarProps } from "@/interfaces";

import Image from "next/image";

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
