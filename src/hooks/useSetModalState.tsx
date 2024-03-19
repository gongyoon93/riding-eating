import { placeModalState, userModalState } from "@/atoms/modal";
import { useRecoilValue, useSetRecoilState } from "recoil";

const useSetModalState = () => {
  const setPlaceModalState = useSetRecoilState(placeModalState);
  const placeModalStateValue = useRecoilValue(placeModalState);
  const setUserModalState = useSetRecoilState(userModalState);
  const userModalStateValue = useRecoilValue(userModalState);
  return {
    setPlaceModalState,
    placeModalStateValue,
    setUserModalState,
    userModalStateValue,
  };
};

export default useSetModalState;
