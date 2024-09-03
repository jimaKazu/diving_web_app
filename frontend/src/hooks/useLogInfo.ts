import { useCallback, useState } from "react";
import { LogInfo } from "../types/api/logInfo";
import { useRecoilValue } from "recoil";
import { loginUserState } from "../provider/LoginUserProvider";
import axiosInstance from "../api/axiosInstance";
import {useMessage} from "./useMessage";
import { useHistory } from "react-router-dom";


type Props = {
  log_id: number;
  logInfoList: Array<LogInfo>;
  onOpen: () => void;
};

// ログ情報を取得する
export const useLogInfo = () => {
  // マイアカウントを取得する
  const loginUser = useRecoilValue(loginUserState);
  //トーストを表示する
  const {showMessage} = useMessage();
  const history = useHistory();

  // ログ情報リスト
  const [logInfoList, setLogInfoList] = useState<Array<LogInfo>>([]);
  // 選択されたログ情報
  const [selectedLogInfo, setSelectedLogInfo] = useState<LogInfo | null>(null);

  // ログ一覧を取得する
  const getLogInfo = useCallback(() => {
    if (loginUser?.id) {
      axiosInstance
        .get<Array<LogInfo>>(`/getLogInfo/${loginUser.id}`)
        .then(res => {
          setLogInfoList(res.data);
        })
        .catch(err => {
          console.error("Failed to fetch log information", err);
        });
    }
  }, [loginUser]);

  // 選択されたログ情報（単体）を取得する
  const getShowLogInfo = useCallback((props: Props) => {
    const { log_id, logInfoList, onOpen } = props;
    const targetLogInfo = logInfoList.find(logInfo => logInfo.log_id === log_id);
    if (targetLogInfo) {
      setSelectedLogInfo(targetLogInfo);
      onOpen();
    }
  }, []);

  // 選択されたログ情報を削除する
  const deleteLogInfo = useCallback((log_id: number, user_id: number) => {
    axiosInstance.delete("/logDelete", {
      data: { // POSTメソッドのbodyの代わりにDELETEメソッドのdataを使います
        log_id,
        user_id
      }
    })
    .then(res => {
      showMessage({ title: "ログ情報が削除されました", status: "success" });
      history.push("/profile/mylog");
      getLogInfo();
    })
    .catch((error) => {
      console.error('Error deleting account:', error);
      showMessage({ title: "サーバーエラーが発生しました。", status: "error" });
    });
  }, [history, showMessage,]);

  return { getLogInfo, getShowLogInfo, logInfoList, selectedLogInfo,deleteLogInfo};
};
