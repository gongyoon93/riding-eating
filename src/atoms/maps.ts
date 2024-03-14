import { atom } from "recoil";

interface PositionState {
  //사용자 좌표
  user: {
    lat: number;
    lng: number;
  };
  //지도 중심 좌표
  map: {
    lat: number;
    lng: number;
  };
}

interface MarkerData {
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

interface PageData {
  current: number;
  first: number;
  gotoFirst(): void;
  gotoLast(): void;
  gotoPage(page: number): void;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  last: number;
  nextPage(): void;
  prevPage(): void;
  perPage?: number;
  totalCount: number;
}

interface MarkerState {
  marker: MarkerData[];
  page: PageData;
}

export const positionState = atom<PositionState>({
  key: "positionState",
  default: {
    user: {
      lat: 37.3595704,
      lng: 127.105399,
    },
    map: {
      lat: 37.3595704,
      lng: 127.105399,
    },
  },
});

export const watchState = atom<{ watchId: number }>({
  key: "watchState",
  default: {
    watchId: 0,
  },
});

export const markerState = atom<MarkerState | null>({
  key: "markerState",
  default: null,
});

export const keywordState = atom<{ keyword: string }>({
  key: "keywordState",
  default: {
    keyword: "",
  },
});
