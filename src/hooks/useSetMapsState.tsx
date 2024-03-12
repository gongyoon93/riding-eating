import { markerState, positionState, watchState } from "@/atoms/maps";
import { useRecoilValue, useSetRecoilState } from "recoil";

const useSetMapsState = () => {
  const setPositionState = useSetRecoilState(positionState);
  const positionStateValue = useRecoilValue(positionState);
  const setCurrentPositionStorage = (lat: number, lng: number) => {
    const positionState = {
      lat,
      lng,
    };
    localStorage.setItem("currentPositionState", JSON.stringify(positionState));
  };
  const setMarkerState = useSetRecoilState(markerState);
  const markerStateValue = useRecoilValue(markerState);
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
    setWatchState,
    watchStateValue,
    setWatchStorage,
  };
};

export default useSetMapsState;
