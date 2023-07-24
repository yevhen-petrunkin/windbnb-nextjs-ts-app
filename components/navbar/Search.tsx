"use client";

import { differenceInCalendarDays } from "date-fns";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import useSearchModal from "@/hooks/useSearchModal";
import useCountries from "@/hooks/useCountries";

import { BiSearch } from "react-icons/bi";

const Search = () => {
  const params = useSearchParams();
  const searchModal = useSearchModal();
  const { getCountryByValue } = useCountries();

  const locationValue = params?.get("locationValue");
  const guestCount = params?.get("guestCount");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getCountryByValue(locationValue as string)?.label;
    }

    return "Anywhere";
  }, [locationValue, getCountryByValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInCalendarDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return "Any Week";
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return "Add Guests";
  }, [guestCount]);

  return (
    <div
      className="border-neutral-200 border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
      onClick={searchModal.onOpen}
    >
      <ul className="flex flex-row items-center justify-between">
        <li className="text-sm font-semibold px-6">{locationLabel}</li>

        <li className="hidden sm:block text-sm font-semibold px-6 border-x-neutral-200 border-x-[1px] flex-1 text-center">
          {durationLabel}
        </li>

        <li className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden sm:block">{guestLabel}</div>
          <div className="p-2 bg-primary-500 rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Search;
