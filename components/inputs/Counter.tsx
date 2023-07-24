"use client";

import { ICounterProps } from "@/interfaces";

import { useCallback } from "react";

import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const Counter: React.FC<ICounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 1) {
      return;
    }
    onChange(value - 1);
  }, [onChange, value]);

  return (
    <li className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <h3 className="font-medium">{title}</h3>
        <p className="font-light text-gray-600">{subtitle}</p>
      </div>

      <div className="flex flex-row items-center gap-4">
        <button
          className="w-10 h-10 flex items-center justify-center text-gray-600 rounded-full border-[1px] border-neutral-500 cursor-pointer transition hover:opacity-80"
          type="button"
          onClick={onReduce}
        >
          <AiOutlineMinus />
        </button>

        <p className="font-light text-xl text-gray-600">{value}</p>

        <button
          className="w-10 h-10 flex items-center justify-center text-gray-600 rounded-full border-[1px] border-neutral-500 cursor-pointer transition hover:opacity-80"
          type="button"
          onClick={onAdd}
        >
          <AiOutlinePlus />
        </button>
      </div>
    </li>
  );
};

export default Counter;
