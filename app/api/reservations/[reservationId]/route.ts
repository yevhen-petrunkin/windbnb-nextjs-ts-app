import { SafeUser } from "@/types";
import { IParams } from "@/interfaces";

import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export const DELETE = async (req: Request, { params }: { params: IParams }) => {
  const currentUser: SafeUser | null = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("Invalid reservation ID.");
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  });

  return NextResponse.json(reservation);
};

import getCurrentUser from "@/actions/getCurrentUser";
