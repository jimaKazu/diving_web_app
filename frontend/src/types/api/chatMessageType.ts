// ユーザ情報Type
// TypeScriptの型定義
export type ChatMessageType = {
    message_id: number; // メッセージID
    sender_id: number;  // 送信者ID
    receiver_id: number; // 受信者ID
    message: string;    // メッセージ内容
    sent_at: string;    // 送信日 (ISO 8601形式の文字列)
    is_read: boolean;   // 既読状態
}