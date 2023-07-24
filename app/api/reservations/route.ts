import { SafeUser, ReservationData } from "@/types";
import { Listing } from "@prisma/client";

import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

import getCurrentUser from "@/actions/getCurrentUser";

export const POST = async (req: Request) => {
  const currentUser: SafeUser | null = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body: ReservationData = await req.json();

  const { totalPrice, startDate, endDate, listingId } = body;

  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }

  const listingReservation: Listing | null = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  });

  return NextResponse.json(listingReservation);
};
