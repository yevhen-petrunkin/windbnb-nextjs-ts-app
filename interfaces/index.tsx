import { IconType } from "react-icons/lib";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { SafeUser } from "@/types";
import { CountrySelectValue } from "@/types";

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
