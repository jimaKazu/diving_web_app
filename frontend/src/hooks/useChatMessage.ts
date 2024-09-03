import { useCallback, useState, useEffect } from "react";
import { User } from "../types/api/user";
import { FriendsRelation } from "../types/api/friendsRelation";
import { ChatMessageType } from "../types/api/chatMessageType";
import axiosInstance from "../api/axiosInstance";
import { useMessage } from "./useMessage";
import { useHistory } from "react-router-dom";


// チャット関連のHOOKS
export const useChatMessage = () => {

    // フレンド一覧State
    const [friendList, setFriendList] = useState<Array<User>>([]);

    // フレンド一覧を取得する関数
    const getFriendList = useCallback((user_id: number) => {
        axiosInstance
            .get<Array<User>>(`/getFriendList`, {
                params: { user_id } // クエリパラメータとして user_id を渡す
            })
            .then(res => {
                setFriendList(res.data);
            })
            .catch(err => {
                console.error("Failed to fetch log information", err);
            });
    }, []);

    // チャットメッセージリストを格納
    const [chatMessage, setChatMessage] = useState<Array<ChatMessageType>>([]);
    // チャットの相手を格納
    const [chatPartner, setChatPartner] = useState<User | undefined>(undefined)

    // フォローリストを取得する
    const getChatMessage = useCallback((loginUserId: number, friendId: number) => {

        axiosInstance
            .get<Array<ChatMessageType>>(`/getChatMessage`, {
                params: {
                    loginUserId, // クエリパラメータとして loginUserId を渡す
                    friendId     // クエリパラメータとして friendId を渡す
                }
            })
            .then(res => {
                setChatMessage(res.data);
                // チャット相手を取得する
                const partner = friendList.find(user => user.id === friendId);
                if (partner) {
                    setChatPartner(partner);
                }
            })
            .catch(err => {
                console.error("Failed to fetch log information", err);
            });
    }, [friendList]);

    // メッセージを送信してDBに登録する関数
    const sendMessage = useCallback((loginUserId: number, friendId: number, message: string) => {
        const newMessage = {
            sender_id: loginUserId,
            receiver_id: friendId,
            message: message,
            sent_at: new Date().toISOString(),  // メッセージ送信時間
            is_read: 0  // 未読フラグ
        };
    
        return axiosInstance
            .post(`/sendMessage`, newMessage)
            .then(res => {
                console.log("Message sent successfully");
                return res.data; // ここで必要なデータを返す
            })
            .catch(err => {
                console.error("Failed to send message", err);
                throw err; // エラーが発生した場合は再スローして呼び出し元で処理できるようにする
            });
    }, [getChatMessage]);

    return { getFriendList, friendList, getChatMessage, chatMessage, chatPartner,sendMessage };
};
