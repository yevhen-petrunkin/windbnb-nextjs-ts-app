import { SafeUnitedReservation, UnitedReservation } from "@/types";
import { IParams } from "@/interfaces";

import prisma from "@/libs/prismadb";

import createReservationsQueryFromSearchParams from "@/helpers/createReservationsQueryFromSearchParams";

export default async function getReservations(
  params: IParams
): Promise<SafeUnitedReservation[]> {
  try {
    const query: object = createReservationsQueryFromSearchParams(params);

    const reservations: UnitedReservation[] = await prisma.reservation.findMany(
      {
        where: query,
        include: { listing: true },
        orderBy: {
          createdAt: "desc",
        },
      }
    );

    const safeReservations: SafeUnitedReservation[] = reservations.map(
      (reservation) => ({
        ...reservation,
        createdAt: reservation.createdAt.toISOString(),
        startDate: reservation.startDate.toISOString(),
        endDate: reservation.endDate.toISOString(),
        listing: {
          ...reservation.listing,
          createdAt: reservation.listing.createdAt.toISOString(),
        },
      })
    );

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
