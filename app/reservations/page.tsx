import { SafeUser, SafeUnitedReservation } from "@/types";

import getCurrentUser from "@/actions/getCurrentUser";
import getReservations from "@/actions/getReservations";

import EmptyState from "@/components/EmptyState";
import ClientOnly from "@/components/ClientOnly";
import ReservationsClient from "@/components/reservations/ReservationsClient";

const ReservationsPage = async () => {
  const currentUser: SafeUser | null = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please, log in." />
      </ClientOnly>
    );
  }

  const reservations: SafeUnitedReservation[] = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Reservations Found"
          subtitle="Looks like you have no reservations on your properties."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ReservationsPage;
