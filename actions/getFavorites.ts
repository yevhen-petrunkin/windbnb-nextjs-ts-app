import { SafeListing, SafeUser } from "@/types";
import { Listing } from "@prisma/client";

import prisma from "@/libs/prismadb";

import getCurrentUser from "./getCurrentUser";

export default async function getFavorites(): Promise<SafeListing[]> {
  try {
    const currentUser: SafeUser | null = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favorites: Listing[] = await prisma.listing.findMany({
      where: { id: { in: [...(currentUser.favoriteIds || [])] } },
    });

    const safeFavorites: SafeListing[] = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toISOString(),
    }));

    return safeFavorites;
  } catch (error: any) {
    throw new Error(error);
  }
}
