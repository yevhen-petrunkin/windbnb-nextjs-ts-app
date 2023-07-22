import prisma from "@/libs/prismadb";
import { Listing, User } from "@prisma/client";
import { SafeListing, UnitedListing, SafeListingFoundById } from "@/types";
import { IListingParams } from "@/interfaces";

export default async function getListingById(
  params: IListingParams
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
