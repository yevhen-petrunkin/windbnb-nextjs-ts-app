import prisma from "@/libs/prismadb";

import { SafeUnitedReservation, UnitedReservation } from "@/types";
import { IParams } from "@/interfaces";

export default async function getReservations(
  params: IParams
): Promise<SafeUnitedReservation[]> {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

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
