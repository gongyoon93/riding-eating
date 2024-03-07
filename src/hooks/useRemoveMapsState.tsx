import { movingState, positionState } from "@/atoms/maps";
import { useSetRecoilState } from "recoil";

const useRemoveMapsState = () => {
  const setMovingState = useSetRecoilState(movingState);
  const removeMovingStorage = () => {
    localStorage.removeItem("movingState");
  };

  const setPositionState = useSetRecoilState(positionState);
  const removePositionStorage = () => {
    localStorage.removeItem("positionState");
  };

  return {
    setMovingState,
    removeMovingStorage,
    setPositionState,
    removePositionStorage,
  };
};

export default useRemoveMapsState;
