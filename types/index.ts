import { User, Listing, Reservation } from "@prisma/client";
import { IconType } from "react-icons/lib";
import { Range } from "react-date-range";

// USER

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

// LISTING

export type UnitedListing = Listing & { user: User };

export type SafeListing = Omit<Listing, "createdAt"> & { createdAt: string };

export type SafeListingFoundById = SafeListing & { user: SafeUser };

// RESERVATION

export type UnitedReservation = Reservation & { listing: Listing };

export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
};

export type SafeUnitedReservation = SafeReservation & { listing: SafeListing };

export type ReservationData = {
  totalPrice: number;
  startDate: Date;
  endDate: Date;
  listingId: string;
};

// OTHER

export type CountrySelectValue = {
  value: string;
  label: string;
  flag: string;
  latlng: number[];
  region: string;
};

export type CategoryData = {
  label: string;
  icon: IconType;
  description: string;
};

export type MouseEventVoidHandler = (
  e: React.MouseEvent<HTMLButtonElement>
) => void;

export type SearchState = {
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  dateRange: Range;
  location?: CountrySelectValue | undefined;
};
