import { positionState } from "@/atoms/maps";
import { useRecoilValue, useSetRecoilState } from "recoil";

const useSetPositionState = () => {
  const setPositionState = useSetRecoilState(positionState);
  const positionStateValue = useRecoilValue(positionState);
  const setCurrentPositionStorage = (lat: number, lng: number) => {
    const positionState = {
      lat,
      lng,
    };
    localStorage.setItem("currentPositionState", JSON.stringify(positionState));
  };

  return { setCurrentPositionStorage, setPositionState, positionStateValue };
};

export default useSetPositionState;
