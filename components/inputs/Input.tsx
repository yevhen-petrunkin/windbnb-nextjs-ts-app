"use client";

import { IInputProps } from "@/interfaces";

import { BiDollar } from "react-icons/bi";

const Input: React.FC<IInputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  required,
  register,
  errors,
}) => {
  return (
    <div className="relative w-full">
      {formatPrice && (
        <BiDollar
          size={24}
          className="absolute top-5 left-2 text-neutral-800"
        />
      )}
      <input
        id={id}
        type={type}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed ${
          formatPrice ? "pl-9" : "pl-4"
        } ${errors[id] ? "border-danger" : "border-neutral-200"} ${
          errors[id]
            ? "focus:border-danger"
            : "focus:border-black hover:border-black"
        }`}
      />
      <label
        className={`absolute top-5 z-10 text-md transform -translate-y-3 duration-150 origin-[0] ${
          formatPrice ? "left-9" : "left-4"
        } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
          errors[id] ? "text-danger" : "text-gray-400"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
