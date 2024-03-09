import { atom } from "recoil";

interface PositionState {
  lat: number;
  lng: number;
}

export const positionState = atom<PositionState[]>({
  key: "positionState",
  default: [
    {
      lat: 37.3595704,
      lng: 127.105399,
    },
  ],
});

export const watchState = atom<{ watchId: number }>({
  key: "watchState",
  default: {
    watchId: 0,
  },
});
