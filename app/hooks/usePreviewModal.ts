import { create } from "zustand";

import { Item } from "@/types";

interface PreviewModalStore {
  isOpen: boolean;
  data?: Item;
  onOpen: (data: Item) => void;
  onClose: () => void;
}

const usePreviewModal = create<PreviewModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: Item) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false }),
}));

export default usePreviewModal;
