import { atom } from "recoil";

interface UserState {
  isLogin: boolean;
  uid: string;
  token?: string;
  email: string;
  name: string;
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
