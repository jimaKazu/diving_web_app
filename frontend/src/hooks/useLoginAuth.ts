
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { User } from "../types/api/user";
import { useMessage } from "./useMessage";

import { loginUserState } from "../provider/LoginUserProvider";
import { useSetRecoilState } from "recoil";
import axiosInstance from "../api/axiosInstance";

export const useLoginAuth = () => {
  const history = useHistory();
  const setLoginUser = useSetRecoilState(loginUserState);
  const { showMessage } = useMessage();

  // ログインチェック
  const login = useCallback((username: string, password: string, onClose: () => void) => {
    // バックエンドにIDとPWを送る
    axiosInstance.get<Array<User>>("/loginAuth", {
      params: {
        username: username,
        password: password,
      },
    })
      .then(res => {
        if (res.data.length === 1) {
          // ログイン情報を格納するProviderに保存
          setLoginUser(res.data[0]);
          // ログイン情報をlocalStorageに保存
          localStorage.setItem("loginUser", JSON.stringify(res.data[0]));

          showMessage({ title: "ログインしました。", status: "success" });
          onClose();
          history.push("/profile");
        } else {
          // ログイン失敗
          showMessage({ title: "ユーザが見つかりません", status: "error" });
        }
      })
      .catch(() => {
        showMessage({ title: "ログインできません", status: "error" });
      });
  }, [setLoginUser, history, showMessage]);

   // ログアウト処理
   const logout = useCallback(() => {
    setLoginUser(null); // Recoilの状態をリセット
    localStorage.removeItem("loginUser"); // localStorageからユーザー情報を削除
    showMessage({ title: "ログアウトしました。", status: "success" });
    history.push("/"); // ログインページにリダイレクト
  }, [setLoginUser, history, showMessage]);

  return { login,logout };
};
