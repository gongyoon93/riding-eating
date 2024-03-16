import { atom } from "recoil";

export const placeModalState = atom<{ isOpen: boolean }>({
  key: "placeModalState",
  default: {
    isOpen: false,
  },
});
