"use client";

import { IHeadingProps } from "@/interfaces";

const Heading: React.FC<IHeadingProps> = ({ title, subtitle, center }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="font-light text-gray-600 mt-2">{subtitle}</p>
    </div>
  );
};

export default Heading;
