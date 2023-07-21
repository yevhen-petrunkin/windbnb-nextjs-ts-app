"use client";

import { MouseEventVoidHandler } from "@/types";
import { IListingCardProps } from "@/interfaces";
import { format } from "date-fns";
import useCountries from "@/hooks/useCountries";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";

const ListingCard: React.FC<IListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
  const {
    id,
    category,
    locationValue,
    guestCount,
    roomCount,
    bathroomCount,
    imageSrc,
    price,
    title,
    description,
    userId,
  } = data;

  const router = useRouter();

  const { getCountryByValue } = useCountries();
  const location = getCountryByValue(locationValue);

  const handleCancel: MouseEventVoidHandler = useCallback(
    (e) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const totalPrice: number = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate: string | null = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <article>
      <div
        onClick={() => router.push(`/listings/${id}`)}
        className="col-span-1 cursor-pointer group"
      >
        <div className="flex flex-col gap-2 w-full">
          <div className="relative aspect-square w-full rounded-xl overflow-hidden">
            <Image
              src={imageSrc}
              alt="Listing"
              fill
              className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
            />

            <div className="absolute top-3 right-3">
              <HeartButton listingId={id} currentUser={currentUser} />
            </div>
          </div>

          <p className="font-semibold">
            {location?.region}, {location?.label}
          </p>

          <p className="font-light text-neutral-500">
            {reservationDate || category}
          </p>

          <p className="font-semibold">
            $ {totalPrice}
            {!reservation && <span className="pl-1 font-light">night</span>}
          </p>

          {onAction && actionLabel && (
            <Button
              disabled={disabled}
              label={actionLabel}
              small
              onClick={handleCancel}
            />
          )}
        </div>
      </div>
    </article>
  );
};

export default ListingCard;
