import { atom } from "recoil";

interface PositionState {
  lat: number;
  lng: number;
}

interface MarkerState {
  address_name: string;
  road_address_name: string;
  category_group_name: string;
  category_name: string;
  phone: string;
  place_name: string;
  place_url: string;
  lat: number;
  lng: number;
  id: number;
}

export const positionState = atom<PositionState>({
  key: "positionState",
  default: {
    lat: 37.3595704,
    lng: 127.105399,
  },
});

export const watchState = atom<{ watchId: number }>({
  key: "watchState",
  default: {
    watchId: 0,
  },
});

export const markerState = atom<MarkerState[] | null>({
  key: "markerState",
  default: [
    {
      address_name: "",
      road_address_name: "",
      category_group_name: "",
      category_name: "",
      phone: "",
      place_name: "",
      place_url: "",
      lat: 37.3595704,
      lng: 127.105399,
      id: 0,
    },
  ],
});

export const keywordState = atom<{ keyword: string }>({
  key: "keywordState",
  default: {
    keyword: "",
  },
});
