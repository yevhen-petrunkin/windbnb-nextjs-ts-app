"use client";

import { useState, useCallback } from "react";
import useRegisterModal from "@/hooks/useRegisterModal";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "@/components/Avatar";
import MenuItem from "./MenuItem";

const UserMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const registerModal = useRegisterModal();

  const toggleOpen = useCallback(() => {
    setIsMenuOpen((value: boolean) => !value);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          onClick={() => {}}
        >
          Your home
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
          <ul className="flex flex-col cursor-pointer">
            <li>
              <MenuItem onClick={() => {}} label="Log In" />
            </li>
            <li>
              <MenuItem onClick={registerModal.onOpen} label="Sign Up" />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
