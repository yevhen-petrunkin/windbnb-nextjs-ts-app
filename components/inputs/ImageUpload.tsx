"use client";

import { IImageUploadProps } from "@/interfaces";

import { useCallback } from "react";

import { CldUploadWidget } from "next-cloudinary";
import { TbPhotoPlus } from "react-icons/tb";

import Image from "next/image";

declare global {
  var cloudinary: any;
}

const ImageUpload: React.FC<IImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="hbfuejby"
      options={{ maxFiles: 1 }}
    >
      {({ open }) => (
        <button
          type="button"
          onClick={() => open?.()}
          className="relative p-20 flex flex-col justify-center items-center gap-4 text-gray-600 border-2 border-dashed border-gray-400 cursor-pointer transition hover:opacity-70 "
        >
          <TbPhotoPlus size={50} />
          <span className="font-semibold text-lg">Click to upload</span>
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={value}
              alt="Uploaded Image"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </button>
      )}
    </CldUploadWidget>
  );
};

export default ImageUpload;
