import { atom } from "recoil";
import { MarkerData } from "./maps";

interface PlaceModalState {
  isOpen: boolean;
  marker: MarkerData | null;
}

export const placeModalState = atom<PlaceModalState>({
  key: "placeModalState",
  default: {
    isOpen: false,
    marker: null,
  },
});
