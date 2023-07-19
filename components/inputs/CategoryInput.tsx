"use client";

import { ICategoryInputProps } from "@/interfaces/interfaces";

const CategoryInput: React.FC<ICategoryInputProps> = ({
  label,
  selected,
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      className={`p-4 w-full flex flex-col gap-3 rounded-xl border-2 hover:border-black transition cursor-pointer ${
        selected ? "border-black" : "border-neutral-200"
      }`}
      onClick={() => onClick(label)}
    >
      <Icon size={30} />
      <span className="font-semibold">{label}</span>
    </button>
  );
};

export default CategoryInput;
