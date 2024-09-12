/* eslint-disable */
import { memo, VFC, useState, ChangeEvent, useCallback, HTMLInputTypeAttribute, useRef, RefObject,useEffect} from "react"
import styled from "styled-components"
import {
    Input,
    Box,
    Flex,
    Stack,
    Center, Divider, Image, Heading, InputGroup, InputLeftAddon, Text, Spacer, HStack, RadioGroup, Radio, Square, Icon, Select, Textarea, Button, useDisclosure, AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton
} from "@chakra-ui/react"
import { FcManager } from "react-icons/fc";
import { BsFillSunFill, BsFillCloudRainFill, BsFillCloudFill, BsCloudSnow, BsEmojiLaughing, BsEmojiAngry, BsEmojiExpressionless, BsEmojiDizzy } from "react-icons/bs";
import { Scrollbar } from "react-scrollbars-custom";
// import { useLoginUser } from "../../hooks/useLoginUser";
import { useMessage } from "../../hooks/useMessage";
import { AnimateSharedLayout } from "framer-motion";
import { ChatMessage } from "../atoms/ChatMessage";
import { ChatFriendButonList } from "../atoms/ChatFriendButtonList";
import { useChatMessage } from "../../hooks/useChatMessage";
import ReactCrop from 'react-image-crop';
import ReactImageBase64 from 'react-image-base64';
import companyIcon from "../../image/summer-6877.gif";

import { loginUserState } from "../../provider/LoginUserProvider";
import { useRecoilValue } from "recoil";
import axiosInstance from "../../api/axiosInstance";
import { motion, AnimatePresence } from 'framer-motion';


export const ChatList: VFC = memo(() => {

    //ログインアカウントを取得する
    const loginUser = useRecoilValue(loginUserState);

    //Hooks
    const { getFriendList, friendList,getChatMessage,chatMessage,chatPartner} = useChatMessage();

    const [key, setKey] = useState(0);

    // フレンド一覧を取得する
    useEffect(() => {
        if (loginUser?.id) {
            getFriendList(loginUser.id);
        }
    }, []);

    // タブボタンがクリックされたときの処理
    const handleTabClick = (user_id: number) => {
        setKey(prevKey => prevKey + 1); // keyを変更して新しいメッセージに切り替え
        // ここにメッセージ取得ロジックを記載
        getChatMessage(loginUser?.id,user_id)

    };

    return (
        <Box
            m="auto"
            mt={10}
            pt={10}
            w="7xl"
            h="70vh"
            maxH="100%"
            maxW="100%"
            borderWidth="1px"
            borderRadius="md"
            bg="rgba(31, 41, 55, 0.8)" // 背景を少し透明に設定
            shadow="md"
            display="flex"
            flexDirection="row"
        >
            <Flex
                direction="column"
                w="20%"
                borderRightWidth="1px"
                p={4}
                overflowY="auto" // スクロールを有効にする
                sx={{
                    // スクロールバーを非表示にする
                    "&::-webkit-scrollbar": {
                        display: "none", // Webkit系ブラウザ（Chrome, Safari）
                    },
                    scrollbarWidth: "none", // Firefox
                    msOverflowStyle: "none" // IE 及び Edge
                }}
            >
                {/* ボタンを表示 */}
                {friendList.map((friend, index)=> (

                    <ChatFriendButonList friend_id={friend.id} fullname={friend.fullname} img={friend.img} onClick={handleTabClick}/>

                ))}
            </Flex>
            <Box flex="1" p={4}
                overflowY="auto" // スクロールを有効にする
                sx={{
                    // スクロールバーを非表示にする
                    "&::-webkit-scrollbar": {
                        display: "none", // Webkit系ブラウザ（Chrome, Safari）
                    },
                    scrollbarWidth: "none", // Firefox
                    msOverflowStyle: "none" // IE 及び Edge
                }}
            >
                <ChatMessage chatPartner={chatPartner} loginUser={loginUser} key={key} />
            </Box>
        </Box>
    );
});












