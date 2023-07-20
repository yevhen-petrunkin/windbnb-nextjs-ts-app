import { IRentModalStore } from "@/interfaces";
import { create } from "zustand";

const useRentModal = create<IRentModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRentModal;
