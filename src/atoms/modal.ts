import { atom } from "recoil";
import { MarkerData } from "./maps";
import { UserState } from "./user";

interface PlaceModalState {
  isOpen: boolean;
  marker: MarkerData | null;
}

interface UserModalState {
  isOpen: boolean;
  user: UserState | null;
}

export const placeModalState = atom<PlaceModalState>({
  key: "placeModalState",
  default: {
    isOpen: false,
    marker: null,
  },
});

export const userModalState = atom<UserModalState>({
  key: "userModalState",
  default: {
    isOpen: false,
    user: null,
  },
});
