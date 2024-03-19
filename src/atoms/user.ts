import { atom } from "recoil";

export interface UserState {
  isLogin: boolean;
  uid: string;
  email: string | null;
  name: string | null;
}

export const userState = atom<UserState>({
  key: "userState",
  default: {
    isLogin: false,
    uid: "",
    email: "",
    name: "",
  },
});
