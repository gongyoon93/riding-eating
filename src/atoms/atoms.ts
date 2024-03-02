import { atom } from "recoil";
import { IAuthState } from "../types/type";

export const userState = atom<IAuthState>({
  key: "userState",
  default: {
    uid: "",
  },
});
