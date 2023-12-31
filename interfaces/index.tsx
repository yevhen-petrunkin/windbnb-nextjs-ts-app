import {
  SafeUser,
  CountrySelectValue,
  SafeListing,
  SafeListingFoundById,
  CategoryData,
  SafeUnitedReservation,
} from "@/types";

import { IconType } from "react-icons/lib";
import { Range, RangeKeyDict } from "react-date-range";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export interface IError {
  error: Error;
}

export interface IContainerProps {
  children: React.ReactNode;
}

export interface IClientOnlyProps extends IContainerProps {}

export interface IMenuItemProps {
  onClick: () => void;
  label: string;
}

export interface IModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

export interface IButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

export interface IRegisterModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export interface ILoginModalStore extends IRegisterModalStore {}
export interface IRentModalStore extends IRegisterModalStore {}
export interface ISearchModalStore extends IRegisterModalStore {}

export interface IHeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export interface IInputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

export interface INavbarProps {
  currentUser?: SafeUser | null;
}

export interface IUserMenuProps extends INavbarProps {}

export interface ISafeFormData {
  email: string;
  name: string;
  password: string;
}

export interface IAvatarProps {
  src: string | null | undefined;
}

export interface ICategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

export interface ICategoryInputProps extends ICategoryBoxProps {
  onClick: (value: string) => void;
}

export interface ICountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

export interface IMapProps {
  center?: number[];
}

export interface ICounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

export interface IImageUploadProps {
  value: string;
  onChange: (value: number) => void;
}

export interface ISafeListingFormData {
  category: string;
  location: CountrySelectValue;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  imageSrc: string;
  price: number;
  title: string;
  description: string;
}

export interface IEmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

export interface ICalendarProps {
  range: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
}

// PARAMS

export interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
  reservationId?: string;
}

export interface IFavParams {
  listingId: string;
}

export interface IListingsParams {
  userId?: string;
  category?: string;
  locationValue?: string;
  startDate?: string;
  endDate?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
}

export interface IListingParams extends IFavParams {}

export interface IUseFavorite extends IFavParams {
  currentUser?: SafeUser | null;
}

export interface IHeartButtonProps extends IFavParams, IUseFavorite {}

// HOME

export interface IHomeProps {
  searchParams: IListingsParams;
}

// LISTING

export interface IListingCardProps {
  data: SafeListing;
  reservation?: SafeUnitedReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

export interface IListingClientProps {
  reservations?: SafeUnitedReservation[];
  listing: SafeListingFoundById;
  currentUser?: SafeUser | null;
}

export interface IListingHeadProps {
  id: string;
  title: string;
  locationValue: string;
  imageSrc: string;
  currentUser?: SafeUser | null;
}

export interface IListingInfoProps {
  category: CategoryData | undefined;
  locationValue: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  description: string;
  user: SafeUser;
}

export interface IListingCategoryProps extends CategoryData {}

export interface IListingReservationProps {
  price: number;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  dateRange: Range;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

// TRIPS

export interface ITripsClientProps {
  reservations: SafeUnitedReservation[];
  currentUser?: SafeUser | null;
}

// RESERVATIONS

export interface IReservationsClientProps extends ITripsClientProps {}

// FAVORITES

export interface IFavoritesClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

// PROPERTIES

export interface IPropertiesClientProps extends IFavoritesClientProps {}
