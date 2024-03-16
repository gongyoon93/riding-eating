import { placeModalState } from "@/atoms/modal";
import { useRecoilValue, useSetRecoilState } from "recoil";

const useSetModalState = () => {
  const setPlaceModalState = useSetRecoilState(placeModalState);
  const placeModalStateValue = useRecoilValue(placeModalState);
  return { setPlaceModalState, placeModalStateValue };
};

export default useSetModalState;
