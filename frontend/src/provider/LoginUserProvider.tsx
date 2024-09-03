import { ReactNode } from "react";
import { atom, useRecoilState, RecoilRoot } from "recoil";
import { User } from "../types/api/user";

type LoginUser = User;

// export type LoginUserContextType = {
//   loginUser: LoginUser | null;
//   setLoginUser: (user: LoginUser | null) => void;
// };

// Recoil atomの定義
export const loginUserState = atom<LoginUser | null>({
  key: "loginUserState",
  default: null,
});