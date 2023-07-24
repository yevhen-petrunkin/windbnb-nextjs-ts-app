import { IListingsParams } from "@/interfaces";
import { SafeListing } from "@/types";
import { Listing } from "@prisma/client";

import prisma from "@/libs/prismadb";

export default async function getListings(
  params: IListingsParams
): Promise<SafeListing[]> {
  try {
    const { userId } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    const listings: Listing[] = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings: SafeListing[] = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
