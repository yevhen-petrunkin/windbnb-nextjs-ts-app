"use client";

import { IReservationsClientProps } from "@/interfaces";
import { SafeUnitedReservation } from "@/types";

import axios from "axios";
import { toast } from "react-hot-toast";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import Container from "../Container";
import Heading from "../Heading";
import ListingCard from "../listings/ListingCard";

const ReservationsClient: React.FC<IReservationsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string>("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled!");
          router.refresh();
        })
        .catch(() => toast.error("Something went wrong."))
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <section>
      <Container>
        <Heading title="Reservations" subtitle="Bookings on your properties." />
        <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {reservations.map((reservation: SafeUnitedReservation) => (
            <li key={reservation.id}>
              <ListingCard
                data={reservation.listing}
                reservation={reservation}
                actionId={reservation.id}
                onAction={onCancel}
                disabled={deletingId === reservation.id}
                actionLabel="Cancel guest reservation"
                currentUser={currentUser}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default ReservationsClient;
