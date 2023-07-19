"use client";

import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { INavbarProps } from "@/interfaces/interfaces";

const Navbar: React.FC<INavbarProps> = ({ currentUser }) => {
  return (
    <header className="fixed w-full bg-white z-10 shadow-sm">
      <nav className="py-4 border-b-[1px] border-neutral-200">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </nav>
    </header>
  );
};

export default Navbar;
