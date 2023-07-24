import { SafeListing, SafeUser } from "@/types";
import { IHomeProps } from "@/interfaces";

import getListings from "@/actions/getListings";
import getCurrentUser from "@/actions/getCurrentUser";

import ClientOnly from "@/components/ClientOnly";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import ListingCard from "@/components/listings/ListingCard";

const Home: React.FC<IHomeProps> = async ({ searchParams }) => {
  const listings: SafeListing[] | never = await getListings(searchParams);
  const currentUser: SafeUser | null = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <ul className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing: SafeListing) => (
            <li key={listing.id}>
              <ListingCard data={listing} currentUser={currentUser} />
            </li>
          ))}
        </ul>
      </Container>
    </ClientOnly>
  );
};

export default Home;
