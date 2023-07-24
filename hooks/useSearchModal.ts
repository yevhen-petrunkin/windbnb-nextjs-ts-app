import { ISearchModalStore } from "@/interfaces";

import { create } from "zustand";

const useSearchModal = create<ISearchModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSearchModal;
