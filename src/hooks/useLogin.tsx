import { useSetRecoilState } from "recoil";
import useSetUserState from "./useSetUserState";
import { AxiosError } from "axios";
import { snackbarState } from "@/atoms/snackbar";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/fbInstance";

// interface LoginData {
//   data: {
//     uid: string;
//     user: { EMAIL: string; NAME: string };
//   };
// }

interface LoginVariable {
  email: string;
  password: string;
}

const useLogin = () => {
  const setSnackBar = useSetRecoilState(snackbarState);
  // const { setLocalStorage, setUserState } = useSetUserState();
  const loginUser = async ({ email, password }: LoginVariable) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const currentUser = userCredential.user;
      console.log(currentUser);
      setSnackBar((pre) => [
        ...pre,
        {
          id: Date.now().toString(),
          type: "notice",
          message: "✅ 다시 돌아오신것을 환영합니다.",
        },
      ]);
      // setLocalStorage(currentUser.uid, currentUser.email, currentUser.email);
      // setUserState((pre) => ({
      //   ...pre,
      //   isLogin: false,
      //   uid: currentUser.uid,
      //   email: EMAIL,
      //   name: NAME,
      // }));
    } catch (err) {
      console.error("Error fetching user data:", err);
      // if (err.response?.status === 400) {
      //   setSnackBar((pre) => [
      //     ...pre,
      //     {
      //       id: Date.now().toString(),
      //       type: "warning",
      //       message: "⛔️ 아이디 또는 비밀번호를 다시 입력해주세요.",
      //     },
      //   ]);
      // }
      // switch (errorCode) {
      //   case "auth/invalid-email":
      //     setErrorMessage("This email address is invalid.");
      //     break;
      //   case "auth/user-disabled":
      //     setErrorMessage(
      //       "This email address is disabled by the administrator."
      //     );
      //     break;
      //   case "auth/user-not-found":
      //     setErrorMessage("This email address is not registered.");
      //     break;
      //   case "auth/wrong-password":
      //     setErrorMessage("The password is invalid or the user does not have a password.")
      //     break;
      //   default:
      //     setErrorMessage(errorMessage);
      //     break;
      // }
    }
  };
  return { loginUser };
};
export default useLogin;
