import { SafeListingFoundById, SafeUser, SafeUnitedReservation } from "@/types";

import getCurrentUser from "@/actions/getCurrentUser";
import getReservations from "@/actions/getReservations";

import EmptyState from "@/components/EmptyState";
import ClientOnly from "@/components/ClientOnly";
import TripsClient from "@/components/trips/TripsClient";

const TripsPage = async () => {
  const currentUser: SafeUser | null = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please, log in." />
      </ClientOnly>
    );
  }

  const reservations: SafeUnitedReservation[] = await getReservations({
    userId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Trips Found"
          subtitle="Looks like you haven't reserved any trips."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default TripsPage;
