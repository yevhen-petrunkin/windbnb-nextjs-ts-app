"use client";

import { IHeadingProps } from "@/interfaces";

const Heading: React.FC<IHeadingProps> = ({ title, subtitle, center }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="text-2xl font-bold">{title}</div>
      <div className="font-light text-gray-600 mt-2">{subtitle}</div>
    </div>
  );
};

export default Heading;
