import { IRegisterModalStore } from "@/interfaces/interfaces";
import { create } from "zustand";

const useRegisterModal = create<IRegisterModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRegisterModal;
