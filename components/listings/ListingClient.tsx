"use client";

import { IListingClientProps } from "@/interfaces";
import { CategoryData } from "@/types";
import categories from "@/constants/categories";
import { useMemo } from "react";
import Container from "@/components/Container";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";

const ListingClient: React.FC<IListingClientProps> = ({
  listing,
  currentUser,
  reservations,
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
          </div>
        </div>
      </section>
    </Container>
  );
};

export default ListingClient;
