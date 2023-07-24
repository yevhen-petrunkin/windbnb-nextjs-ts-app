"use client";

import { useRouter } from "next/navigation";

import Image from "next/image";

const Logo = () => {
  const router = useRouter();

  return (
    <div>
      <Image
        src="/images/logo.png"
        className="hidden md:block cursor-pointer"
        width="100"
        height="100"
        alt="Logo"
        onClick={() => router.push("/")}
      />
    </div>
  );
};

export default Logo;
