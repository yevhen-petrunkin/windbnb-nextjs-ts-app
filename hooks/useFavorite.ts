import { MouseEventVoidHandler } from "@/types";
import { IUseFavorite } from "@/interfaces";

import axios from "axios";
import { toast } from "react-hot-toast";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import useLoginModal from "./useLoginModal";

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited: boolean = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.some((id) => id.toLowerCase() === listingId.toLowerCase());
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback<MouseEventVoidHandler>(
    async (e) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();
        router.refresh();
        toast.success("Success");
      } catch (error: any) {
        console.error(error.message);
        toast.error("Something went wrong.");
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
  );

  return { hasFavorited, toggleFavorite };
};

export default useFavorite;
