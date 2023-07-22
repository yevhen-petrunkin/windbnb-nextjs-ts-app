import { User, Listing } from "@prisma/client";
import { IconType } from "react-icons/lib";

export type UnitedListing = Listing & { user: User };

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & { createdAt: string; updatedAt: string; emailVerified: string | null };

export type SafeListing = Omit<Listing, "createdAt"> & { createdAt: string };

export type SafeListingFoundById = SafeListing & { user: SafeUser };

export type CountrySelectValue = {
  value: string;
  label: string;
  flag: string;
  latlng: number[];
  region: string;
};

export type MouseEventVoidHandler = (
  e: React.MouseEvent<HTMLButtonElement>
) => void;

export type CategoryData = {
  label: string;
  icon: IconType;
  description: string;
};
