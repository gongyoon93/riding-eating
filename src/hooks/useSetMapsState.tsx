import { movingState, positionState } from "@/atoms/maps";
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
  const setIsMovingState = useSetRecoilState(movingState);
  const isMovingStateValue = useRecoilValue(movingState);
  const setMovingStorage = (isMoving: boolean) => {
    const movingState = {
      isMoving,
    };
    localStorage.setItem("movingState", JSON.stringify(movingState));
  };
  return {
    setCurrentPositionStorage,
    setPositionState,
    positionStateValue,
    setIsMovingState,
    isMovingStateValue,
    setMovingStorage,
  };
};

export default useSetMapsState;
