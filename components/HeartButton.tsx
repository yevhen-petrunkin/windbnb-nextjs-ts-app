"use client";

import { IHeartButtonProps } from "@/interfaces";

import useFavorite from "@/hooks/useFavorite";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const HeartButton: React.FC<IHeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <button
      type="button"
      className="relative cursor-pointer transition hover:opacity-80"
      onClick={toggleFavorite}
    >
      <AiOutlineHeart
        size={28}
        className="absolute -top-[2px] -right-[2px] fill-white"
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? "fill-danger" : "fill-neutral-500/70"}
      />
    </button>
  );
};

export default HeartButton;
