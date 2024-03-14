import {
  keywordState,
  markerState,
  positionState,
  watchState,
} from "@/atoms/maps";
import { useRecoilValue, useSetRecoilState } from "recoil";

const useSetMapsState = () => {
  const setPositionState = useSetRecoilState(positionState);
  const positionStateValue = useRecoilValue(positionState);
  const setCurrentPositionStorage = (
    userLat: number,
    userLng: number,
    mapLat: number,
    mapLng: number
  ) => {
    const positionState = {
      user: {
        lat: userLat,
        lng: userLng,
      },
      map: {
        lat: mapLat,
        lng: mapLng,
      },
    };
    localStorage.setItem("currentPositionState", JSON.stringify(positionState));
  };
  const setMarkerState = useSetRecoilState(markerState);
  const markerStateValue = useRecoilValue(markerState);
  const setKeywordState = useSetRecoilState(keywordState);
  const keywordStateValue = useRecoilValue(keywordState);
  const setKeywordStorage = (keyword: string) => {
    const keywordState = {
      keyword: keyword.replace(/\s*반려동물\s*/g, ""),
    };
    localStorage.setItem("keywordState", JSON.stringify(keywordState));
  };
  const setWatchState = useSetRecoilState(watchState);
  const watchStateValue = useRecoilValue(watchState);
  const setWatchStorage = (watchId: number) => {
    const watchState = {
      watchId,
    };
    localStorage.setItem("watchState", JSON.stringify(watchState));
  };
  return {
    setCurrentPositionStorage,
    setPositionState,
    positionStateValue,
    setMarkerState,
    markerStateValue,
    setKeywordState,
    keywordStateValue,
    setKeywordStorage,
    setWatchState,
    watchStateValue,
    setWatchStorage,
  };
};

export default useSetMapsState;
