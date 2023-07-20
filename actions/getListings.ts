import prisma from "@/libs/prismadb";
import { Listing } from "@prisma/client";

export default async function getListings(): Promise<Listing[] | never> {
  try {
    const listings: Listing[] | never = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
}
