import { IFavParams } from "@/interfaces";
import { SafeUser } from "@/types";
import { User } from "@prisma/client";

import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/getCurrentUser";

// ------------POST---------------

export const POST = async (
  req: Request,
  { params }: { params: IFavParams }
) => {
  const currentUser: SafeUser | null = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid listing ID.");
  }

  try {
    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds.push(listingId);

    const user: User | null = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: { favoriteIds },
    });

    return NextResponse.json(user);
  } catch (error) {}
};

// ---------- DELETE -----------

export const DELETE = async (
  req: Request,
  { params }: { params: IFavParams }
) => {
  const currentUser: SafeUser | null = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid listing ID.");
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  const user: User | null = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: { favoriteIds },
  });

  return NextResponse.json(user);
};
