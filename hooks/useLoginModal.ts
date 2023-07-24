import { ILoginModalStore } from "@/interfaces";

import { create } from "zustand";

const useLoginModal = create<ILoginModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLoginModal;
