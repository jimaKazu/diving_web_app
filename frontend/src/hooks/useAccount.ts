
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useMessage } from "./useMessage";
import { loginUserState } from "../provider/LoginUserProvider";
import { User } from "../types/api/user";
import { useSetRecoilState } from "recoil";
import axiosInstance from "../api/axiosInstance";

interface AccountData {
  username: string;
  password: string;
  fullName: string;
  license: string;
  diveCnt: number;
  old: number;
  fromAddress: string;
  divingHistory: number;
  likeDivingSpots: string;
  likefish: string;
  selfIntroduction: string;
  img: string;
}

export const useAccount = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const setLoginUser = useSetRecoilState(loginUserState);

  // アカウントを更新する
  const updateAccount = useCallback((userid: number, accountData: AccountData) => {
    console.log('User ID:', userid);
    console.log('Account Data:', accountData);

    axiosInstance.post("/accountUpdate", {
      userid,
      ...accountData
    })
    .then(res => {
      showMessage({ title: "アカウント情報が更新されました。", status: "success" });

      // バックエンドにIDを送信して更新後のユーザー情報を取得する
      return axiosInstance.get<User>("/getUser", {
        params: { id: userid }
      });
    })
    .then(res => {
      setLoginUser(res.data);
      history.push("/profile");
    })
    .catch((error) => {
      console.error('Error updating account:', error);
      showMessage({ title: "サーバーエラーが発生しました。", status: "error" });
    });
  }, [history, showMessage, setLoginUser]);




  // アカウントを削除する
  const deleteAccount = useCallback((userid: number) => {
    console.log('User ID:', userid);

    axiosInstance.post("/accountDelete", {
      userid
    })
    .then(res => {
      showMessage({ title: "アカウント情報が削除されました", status: "success" });
      history.push("/");
    })
    .catch((error) => {
      console.error('Error deleting account:', error);
      showMessage({ title: "サーバーエラーが発生しました。", status: "error" });
    });
  }, [history, showMessage,]);

  return { updateAccount,deleteAccount };
};
