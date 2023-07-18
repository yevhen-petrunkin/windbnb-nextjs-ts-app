"use client";

import { useState, useCallback } from "react";
import { signOut } from "next-auth/react";
import { IUserMenuProps } from "@/interfaces/interfaces";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "@/components/Avatar";
import MenuItem from "./MenuItem";

const UserMenu: React.FC<IUserMenuProps> = ({ currentUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  console.log("Current User:", currentUser);

  const toggleOpen = useCallback(() => {
    setIsMenuOpen((value: boolean) => !value);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="hidden lg:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          onClick={() => {}}
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
          <Avatar />
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-12 right-0 w-[40vw] md:w-3/4 text-sm bg-white rounded-xl shadow-md overflow-hidden">
          {currentUser ? (
            <ul className="flex flex-col cursor-pointer">
              <li>
                <MenuItem onClick={() => {}} label="My Trips" />
              </li>
              <li>
                <MenuItem onClick={() => {}} label="My Favorites" />
              </li>
              <li>
                <MenuItem onClick={() => {}} label="My Reservations" />
              </li>
              <li>
                <MenuItem onClick={() => {}} label="My Properties" />
              </li>
              <li>
                <MenuItem onClick={() => {}} label="Windy My Home" />
              </li>
              <li>
                <hr />
                <MenuItem onClick={() => signOut()} label="Log Out" />
              </li>
            </ul>
          ) : (
            <ul className="flex flex-col cursor-pointer">
              <li>
                <MenuItem onClick={loginModal.onOpen} label="Log In" />
              </li>
              <li>
                <MenuItem onClick={registerModal.onOpen} label="Sign Up" />
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
