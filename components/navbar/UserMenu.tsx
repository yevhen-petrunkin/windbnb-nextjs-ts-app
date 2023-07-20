"use client";

import { useState, useCallback } from "react";
import { signOut } from "next-auth/react";
import { IUserMenuProps } from "@/interfaces";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import useRentModal from "@/hooks/useRentModal";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "@/components/Avatar";
import MenuItem from "./MenuItem";

const UserMenu: React.FC<IUserMenuProps> = ({ currentUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const toggleOpen = useCallback(() => {
    setIsMenuOpen((value: boolean) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="hidden min-[820px]:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          onClick={onRent}
        >
          Windy Your Home
        </div>

        <div
          className="p-4 md:py-2 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full transition cursor-pointer hover:shadow-md"
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
        </div>

        <div className="hidden md:block">
          <Avatar src={currentUser?.image} />
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-12 right-0 w-[40vw] md:w-3/4 text-sm bg-white rounded-xl shadow-md overflow-hidden">
          {currentUser ? (
            <ul className="flex flex-col cursor-pointer">
              <MenuItem onClick={() => {}} label="My Trips" />

              <MenuItem onClick={() => {}} label="My Favorites" />

              <MenuItem onClick={() => {}} label="My Reservations" />

              <MenuItem onClick={() => {}} label="My Properties" />

              <MenuItem onClick={rentModal.onOpen} label="Windy My Home" />

              <MenuItem onClick={() => signOut()} label="Log Out" />
            </ul>
          ) : (
            <ul className="flex flex-col cursor-pointer">
              <MenuItem onClick={loginModal.onOpen} label="Log In" />

              <MenuItem onClick={registerModal.onOpen} label="Sign Up" />
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
