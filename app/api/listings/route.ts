import { ISafeListingFormData } from "@/interfaces";
import { SafeUser } from "@/types";

import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

import getCurrentUser from "@/actions/getCurrentUser";

export const POST = async (req: Request) => {
  const currentUser: SafeUser | null = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body: ISafeListingFormData = await req.json();

  const {
    category,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    imageSrc,
    price,
    title,
    description,
  } = body;

  if (Object.values(body).some((value) => !value)) {
    return new Response(
      "Failed to create a new post due to incomplete incoming data.",
      { status: 400 }
    );
  }

  const listing = await prisma.listing.create({
    data: {
      category,
      locationValue: location.value,
      guestCount,
      roomCount,
      bathroomCount,
      imageSrc,
      price: parseInt(price.toString(), 10),
      title,
      description,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
};
