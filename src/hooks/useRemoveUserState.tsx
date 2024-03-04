import { userState } from "@/atoms/user";
import { useSetRecoilState } from "recoil";

const useRemoveUserState = () => {
  const setUserState = useSetRecoilState(userState);

  const removeLocalStorage = () => {
    localStorage.removeItem("accessState");
  };

  return { setUserState, removeLocalStorage };
};

export default useRemoveUserState;
