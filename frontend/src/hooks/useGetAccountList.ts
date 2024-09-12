import { useCallback, useState,useEffect } from "react";
import { User } from "../types/api/user";
import { FriendsRelation } from "../types/api/friendsRelation";
import { useRecoilValue } from "recoil";
import { loginUserState } from "../provider/LoginUserProvider";
import axiosInstance from "../api/axiosInstance";
import { useMessage } from "./useMessage";
import { useHistory } from "react-router-dom";

// アカウントを取得する
export const useGetAccountList = () => {

    const loginUser = useRecoilValue(loginUserState);

    // アカウントリストステート
    const [accountList, setAccountList] = useState<Array<User>>([]);

    // アカウント一覧を取得する
    const getAccountList = useCallback(() => {
        axiosInstance
            .get<Array<User>>(`/getAccountList`)
            .then(res => {
                setAccountList(res.data);
            })
            .catch(err => {
                console.error("Failed to fetch log information", err);
            });
    }, []);

    // accountList が更新されたときにアラートを表示
//     useEffect(() => {
//     if (accountList.length > 0) {
//         alert(JSON.stringify(accountList, null, 2));
//     }
// }, [accountList]);

    // フォロー情報取得関数
    const [friends_relation, setFriendsRelation] = useState<Array<FriendsRelation>>([]);

    // フォローリストを取得する
    const getFriendsRelationList = useCallback((user_id:number) => {
        axiosInstance
            .get<Array<FriendsRelation>>(`/getFriendsRelation`, {
                params: { user_id } // クエリパラメータとして user_id を渡す
            })
            .then(res => {
                setFriendsRelation(res.data);
            })
            .catch(err => {
                console.error("Failed to fetch log information", err);
            });
    }, []);



    return { getAccountList,accountList,getFriendsRelationList,friends_relation};
};
