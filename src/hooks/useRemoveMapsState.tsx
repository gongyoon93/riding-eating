import { positionState, watchState } from "@/atoms/maps";
import { useSetRecoilState } from "recoil";

const useRemoveMapsState = () => {
  const setWatchState = useSetRecoilState(watchState);
  const removeWatchStorage = () => {
    localStorage.removeItem("watchState");
  };

  const setPositionState = useSetRecoilState(positionState);
  const removePositionStorage = () => {
    localStorage.removeItem("positionState");
  };

  return {
    setWatchState,
    removeWatchStorage,
    setPositionState,
    removePositionStorage,
  };
};

export default useRemoveMapsState;
