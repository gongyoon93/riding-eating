import { useSetRecoilState } from "recoil";
import useSetUserState from "./useSetUserState";
import { AxiosError } from "axios";
import { snackbarState } from "@/atoms/snackbar";
import {
  getAuth,
  UserCredential,
  signInWithEmailAndPassword,
  updateProfile as setProfile,
} from "firebase/auth";
import { auth } from "@/firebase/fbInstance";
import { useMutation as ReactMutation } from "@tanstack/react-query";

interface LoginVariable {
  email: string;
  password: string;
}

const useUsers = () => {
  const setSnackBar = useSetRecoilState(snackbarState);
  const { setLocalStorage, setUserState } = useSetUserState();
  const useLogin = () => {
    return ReactMutation<UserCredential, AxiosError, LoginVariable>({
      mutationFn: async (formData) =>
        await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        ),
      onError: (error) => {
        if (error.response?.status === 400) {
          setSnackBar((pre) => [
            ...pre,
            {
              id: Date.now().toString(),
              type: "warning",
              message: "⛔️ 아이디 또는 비밀번호를 다시 입력해주세요.",
            },
          ]);
        }
      },
      onSuccess: ({ user }) => {
        setSnackBar((pre) => [
          ...pre,
          {
            id: Date.now().toString(),
            type: "notice",
            message: "✅ 환영합니다.",
          },
        ]);
        setLocalStorage(user.uid, user.email, user.displayName);
        setUserState((pre) => ({
          ...pre,
          isLogin: false,
          uid: user.uid,
          email: user.email,
          name: user.displayName,
        }));
      },
    });
  };
  const updateProfile = () => {
    const auth = getAuth();
    if (auth.currentUser) {
      setProfile(auth.currentUser, { displayName: "테스터" });
    }
  };
  return { useLogin, updateProfile };
};
export default useUsers;
