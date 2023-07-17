import { IconType } from "react-icons/lib";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

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