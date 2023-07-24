"use client";

import { CategoryData } from "@/types";

import { usePathname, useSearchParams } from "next/navigation";

import categories from "@/constants/categories";

import Container from "../Container";
import CategoryBox from "../CategoryBox";

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <ul className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map(({ label, icon, description }: CategoryData) => (
          <CategoryBox
            key={label}
            label={label}
            selected={category === label}
            icon={icon}
          />
        ))}
      </ul>
    </Container>
  );
};

export default Categories;
