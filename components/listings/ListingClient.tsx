"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { eachDayOfInterval, differenceInCalendarDays } from "date-fns";

import { Reservation } from "@prisma/client";
import { Range } from "react-date-range";
import { IListingClientProps } from "@/interfaces";
import { CategoryData } from "@/types";

import categories from "@/constants/categories";

import useLoginModal from "@/hooks/useLoginModal";
import { useMemo, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

import Container from "@/components/Container";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import ListingReservation from "./ListingReservation";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const ListingClient: React.FC<IListingClientProps> = ({
  listing,
  currentUser,
  reservations = [],
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
    user,
  } = listing;

  const router = useRouter();
  const loginModal = useLoginModal();

  const disabledDates: Date[] = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: Reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = { ...dates, ...range };
    });

    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    setIsLoading(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Listing reserved!");
        setDateRange(initialDateRange);
        // Redirect to trips
        router.refresh();
      })
      .catch(() => toast.error("Something went wrong."))
      .finally(() => {
        setIsLoading(false);
      });
  }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && price) {
        setTotalPrice(dayCount * price);
      } else {
        setTotalPrice(price);
      }
    }
  }, [dateRange, price]);

  const neededCategory: CategoryData | undefined = useMemo(() => {
    return categories.find(
      (item) => item.label.toLowerCase() === category.toLowerCase()
    );
  }, [category]);

  return (
    <Container>
      <section className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            id={id}
            title={title}
            imageSrc={imageSrc}
            locationValue={locationValue}
            currentUser={currentUser}
          />

          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={user}
              category={neededCategory}
              locationValue={locationValue}
              guestCount={guestCount}
              roomCount={roomCount}
              bathroomCount={bathroomCount}
              description={description}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default ListingClient;
