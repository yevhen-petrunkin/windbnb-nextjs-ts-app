"use client";

import { IFavoritesClientProps } from "@/interfaces";
import { SafeListing } from "@/types";

import Container from "../Container";
import Heading from "../Heading";
import ListingCard from "../listings/ListingCard";

const FavoritesClient: React.FC<IFavoritesClientProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <section>
      <Container>
        <Heading title="Favorites" subtitle="Places you have favorited!" />
        <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing: SafeListing) => (
            <li key={listing.id}>
              <ListingCard data={listing} currentUser={currentUser} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default FavoritesClient;
