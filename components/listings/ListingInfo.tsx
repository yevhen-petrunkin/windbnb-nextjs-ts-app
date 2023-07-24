"use client";

import { IListingInfoProps } from "@/interfaces";

import dynamic from "next/dynamic";

import { useMemo } from "react";
import useCountries from "@/hooks/useCountries";

import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";

const ListingInfo: React.FC<IListingInfoProps> = ({
  category,
  locationValue,
  guestCount,
  roomCount,
  bathroomCount,
  description,
  user,
}) => {
  const { getCountryByValue } = useCountries();

  const coordinates: number[] | undefined =
    getCountryByValue(locationValue)?.latlng;

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [locationValue]
  );

  return (
    <div className="col-span-4 flex flex-col gap-8 [&>*:not(:last-child)]:border-b-neutral-500 [&>*:not(:last-child)]:border-b-[1px] [&>*:not(:last-child)]:pb-8">
      <article className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2 text-xl font-semibold">
          <h3>Hosted by {user?.name}</h3>
          <Avatar src={user?.image} />
        </div>

        <ul className="flex flex-row items-center gap-4 font-light text-gray-600">
          <li>{guestCount} guests</li>
          <li>{roomCount} rooms</li>
          <li>{bathroomCount} bathrooms</li>
        </ul>
      </article>

      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}

      <p className="text-lg font-light text-gray-600">{description}</p>

      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
