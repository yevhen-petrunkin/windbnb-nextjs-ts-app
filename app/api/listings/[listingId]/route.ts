import { IListingParams } from "@/interfaces";
import { SafeUser } from "@/types";

import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/getCurrentUser";

export const DELETE = async (
  req: Request,
  { params }: { params: IListingParams }
) => {
  const currentUser: SafeUser | null = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid listing ID.");
  }

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
};
