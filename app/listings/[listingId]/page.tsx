import { IParams } from "@/interfaces";
import { SafeListingFoundById, SafeUser, SafeUnitedReservation } from "@/types";

import getListingById from "@/actions/getListingById";
import getCurrentUser from "@/actions/getCurrentUser";
import getReservations from "@/actions/getReservations";

import EmptyState from "@/components/EmptyState";
import ClientOnly from "@/components/ClientOnly";
import ListingClient from "@/components/listings/ListingClient";

const ListingPage: React.FC<{ params: IParams }> = async ({ params }) => {
  const listing: SafeListingFoundById | null = await getListingById(params);
  const reservations: SafeUnitedReservation[] = await getReservations(params);
  const currentUser: SafeUser | null = await getCurrentUser();

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ListingPage;
