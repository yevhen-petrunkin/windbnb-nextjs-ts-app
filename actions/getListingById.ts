import { UnitedListing, SafeListingFoundById } from "@/types";
import { IParams } from "@/interfaces";

import prisma from "@/libs/prismadb";

export default async function getListingById(
  params: IParams
): Promise<SafeListingFoundById | null> {
  try {
    const { listingId } = params;

    const listing: UnitedListing | null = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }

    const safeListing: SafeListingFoundById = {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toISOString() || null,
      },
    };

    return safeListing;
  } catch (error: any) {
    throw new Error();
  }
}
