import { userState } from "@/atoms/user";
import { useRecoilValue, useSetRecoilState } from "recoil";

const useSetUserState = () => {
  const setUserState = useSetRecoilState(userState);
  const userStateValue = useRecoilValue(userState);
  const setLocalStorage = (uid: string, email: string, name: string) => {
    const userState = {
      isLogin: true,
      uid,
      email,
      name,
    };
    localStorage.setItem("accessState", JSON.stringify(userState));
  };

  return { setLocalStorage, setUserState, userStateValue };
};

export default useSetUserState;
