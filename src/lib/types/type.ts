import { QueryFunction } from "@tanstack/react-query";
import { UserCredential } from "firebase/auth";

export interface IUserInfo {
  email: string;
  password: string;
}

export interface IFetchQueryProps<T> {
  queryKey: Array<string | number | T>;
  queryFn: QueryFunction<UserCredential | T>;
}

// Atom Interface------------------------------------------------

export interface IAuthState {
  uid: string;
}
