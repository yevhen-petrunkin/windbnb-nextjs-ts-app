"use client";

import { useState, useEffect, useCallback } from "react";
import { IModalProps } from "@/interfaces/interfaces";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

const Modal: React.FC<IModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState<boolean | undefined>(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed z-50 inset-0 flex justify-center items-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-neutral-800/70">
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
          {/* CONTENT */}

          <div
            className={`translate transition duration-300 h-full ${
              showModal ? "translate-y-0" : "translate-y-full"
            } ${showModal ? "opacity-100" : "opacity-0"}`}
          >
            <div className="relative flex flex-col translate w-full h-full lg:h-auto md:h-auto bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              {/* HEADING */}

              <div className="relative flex justify-center items-center p-6 border-b-[1px] rounded-t ">
                <button
                  className="absolute left-9 p-1 border-0 hover:opacity-70 transition"
                  type="button"
                  onClick={handleClose}
                >
                  <IoMdClose size={18} />
                </button>
                <p className="text-lg font-semibold">{title}</p>
              </div>
              {/* BODY */}

              <div className="relative p-6 flex-auto">{body}</div>
              {/* FOOTER */}

              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center gap-4 w-full">
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                    />
                  )}
                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
