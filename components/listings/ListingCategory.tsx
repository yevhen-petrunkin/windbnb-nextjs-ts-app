"use client";

import { IListingCategoryProps } from "@/interfaces";

const ListingCategory: React.FC<IListingCategoryProps> = ({
  label,
  icon: Icon,
  description,
}) => {
  return (
    <article className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <Icon size={40} className="text-gray-600" />
        <div className="flex flex-col">
          <h3 className="text-log font-semibold">{label}</h3>
          <p className="text-neutral-500 font-light">{description}</p>
        </div>
      </div>
    </article>
  );
};

export default ListingCategory;
