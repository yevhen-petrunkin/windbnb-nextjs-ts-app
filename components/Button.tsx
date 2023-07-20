"use client";

import { IButtonProps } from "@/interfaces";

const Button: React.FC<IButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full ${
        outline ? "bg-white" : "bg-primary-500"
      } ${outline ? "border-black" : "border-primary-500"} ${
        outline ? "text-black" : "text-white"
      } ${small ? "py-1" : "py-3"} ${small ? "text-sm" : "text-md"} ${
        small ? "font-light" : "font-semibold"
      } ${small ? "border-[1px]" : "border-2"}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon size={24} className="absolute top-3 left-4" />}
      {label}
    </button>
  );
};

export default Button;
