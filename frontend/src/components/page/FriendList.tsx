import { memo, VFC, useCallback, useState, ChangeEvent, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
    Box,
    Flex,
    Stack,
    Center,
    Divider,
    Heading,
    Image,
    Text,
    Badge,
    Button,
    Icon,
    Textarea,
    Table,
    Tbody,
    Tr,
    Td,
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    useDisclosure,
    Input,
    FormControl,
    FormLabel,
    NumberInputField,
    NumberIncrementStepper,
    NumberInputStepper,
    NumberInput,
    NumberDecrementStepper,
    Select,
    ModalFooter,
    SimpleGrid,
    Spinner
} from "@chakra-ui/react";
import { BsFillCaretDownFill, BsAwardFill } from "react-icons/bs";
import { FcElectricalSensor, FcBusinessman, FcReadingEbook } from "react-icons/fc";
import { AiOutlineSetting } from "react-icons/ai";
import { Scrollbar } from "react-scrollbars-custom"; // Ensure this is installed and used correctly
import companyIcon from "../../image/summer-6877.gif";
import { loginUserState } from "../../provider/LoginUserProvider";
import { useRecoilValue } from "recoil";
import { useAccount } from "../../hooks/useAccount";
import { useGetAccountList } from "../../hooks/useGetAccountList";
import ReactImageBase64 from 'react-image-base64';
import { FriendCard } from "../atoms/FriendCard"; // 上記のProfileCardをインポート
import { FcLike } from "react-icons/fc";
import { motion } from "framer-motion";
import { AccountList } from "./AccountList"
import { ChatList } from "./ChatList"

export const FriendList: VFC = memo(() => {

    // ボタンによる画面遷移制御
    const [activeView, setActiveView] = useState<'friends' | 'chat'>('friends');

    return (
        <>
        <Box w="100vw" h="90vh" backgroundImage={`url(${companyIcon})`} // 背景画像にGIFを設定
            backgroundSize="cover" // 背景画像がBox全体にフィットするように設定
            backgroundPosition="center" // 背景画像を中央に配置
        >
            <Flex>
            <Button
                    w="50%"
                    borderRadius="0"
                    bg={activeView === 'friends' ? "rgba(0, 123, 255, 0.7)" : "rgba(173, 216, 230, 0.5)"}
                    color={activeView === 'friends' ? "white" : "white"}
                    _hover={{ bg: activeView === 'friends' ? "rgba(0, 123, 255, 0.8)" : "rgba(0, 123, 255, 0.6)" }}
                    onClick={() => setActiveView('friends')}
                >
                    公開アカウントリスト
                </Button>
                <Button
                    w="50%"
                    borderRadius="0"
                    bg={activeView === 'chat' ? "rgba(0, 123, 255, 0.7)" : "rgba(173, 216, 230, 0.5)"}
                    color={activeView === 'chat' ? "white" : "white"}
                    _hover={{ bg: activeView === 'chat' ? "rgba(0, 123, 255, 0.8)" : "rgba(0, 123, 255, 0.6)" }}
                    onClick={() => setActiveView('chat')}
                >
                    チャット
                </Button>
            </Flex>
            {activeView === 'friends' && <AccountList />}
            {activeView === 'chat' && <ChatList />}
        </Box>

        </>

    );
});
