import prisma from "@/libs/prismadb";
import { Listing } from "@prisma/client";
import { SafeListing } from "@/types";

export default async function getListings(): Promise<SafeListing[]> {
  try {
    const listings: Listing[] = await prisma.listing.findMany({
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
