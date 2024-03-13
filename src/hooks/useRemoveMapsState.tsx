import { keywordState, positionState, watchState } from "@/atoms/maps";
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

  const setKeywordState = useSetRecoilState(keywordState);
  const removeKeywordStorage = () => {
    localStorage.removeItem("keywordState");
  };

  return {
    setWatchState,
    removeWatchStorage,
    setPositionState,
    removePositionStorage,
    setKeywordState,
    removeKeywordStorage,
  };
};

export default useRemoveMapsState;
