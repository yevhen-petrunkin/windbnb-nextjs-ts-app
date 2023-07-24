"use client";

import { IListingHeadProps } from "@/interfaces";
import { CountrySelectValue } from "@/types";

import useCountries from "@/hooks/useCountries";

import Image from "next/image";
import Heading from "../Heading";
import HeartButton from "../HeartButton";

const ListingHead: React.FC<IListingHeadProps> = ({
  id,
  title,
  locationValue,
  imageSrc,
  currentUser,
}) => {
  const { getCountryByValue } = useCountries();

  const location: CountrySelectValue | undefined =
    getCountryByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="relative w-full h-[60vh] overflow-hidden rounded-xl">
        <Image
          src={imageSrc}
          className="w-full object-cover"
          alt="Image"
          fill
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
