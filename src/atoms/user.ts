import { atom } from "recoil";

interface UserState {
  isLogin: boolean;
  uid: string;
  token?: string;
  email: string | null;
  name: string | null;
}

export const userState = atom<UserState>({
  key: "userState",
  default: {
    isLogin: false,
    uid: "",
    token: "",
    email: "",
    name: "",
  },
});
