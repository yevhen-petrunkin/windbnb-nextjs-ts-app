import { User, Listing } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & { createdAt: string; updatedAt: string; emailVerified: string | null };

export type SafeListing = Omit<Listing, "createdAt"> & { createdAt: string };

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
