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
import { FriendProfileModal } from "../molecules/FriendProfileModal"; // モーダルコンポーネントをインポート

// カード表示アニメーション
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1, // 子要素のアニメーションの遅延
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};


// ハートアイコンのアニメーション設定
const HeartAnimation = motion(Box);
const heartVariants = {
    initial: { scale: 0.5, opacity: 0 },
    animate: {
        scale: [0.5, 1.2, 0.8, 1], // スケールの変化を定義
        opacity: [0, 1, 0.5, 1], // 不透明度の変化を定義
        transition: {
            duration: 0.6,
            ease: "easeInOut",
            repeat: 0, // アニメーションを1回繰り返す
        },
    },
    exit: { scale: 0, opacity: 0, transition: { duration: 0.3 } },
};

export const AccountList: VFC = memo(() => {

    // ログインユーザ取得
    const loginUser = useRecoilValue(loginUserState);
    // Hook
    const { getAccountList, accountList, getFriendsRelationList, friends_relation } = useGetAccountList();
    // 状態
    const [refreshFlag, setRefreshFlag] = useState(false);
    // ロード中の状態管理
    const [isLoading, setIsLoading] = useState(true); // ロード中フラグ
    // ユーザ情報をセットする
    const [selectedFriend, setSelectedFriend] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    // アカウント情報を取得する
    useEffect(() => {
        if (loginUser?.id) {
            getAccountList();
            // getFriendsRelationList(loginUser.id);
            setRefreshFlag(false);
        }
    }, [loginUser?.id]); // loginUser が変更されたときにのみ実行

    // フォロー関係を取得する。
    useEffect(() => {
        if (loginUser?.id) {
            getFriendsRelationList(loginUser.id);
            setRefreshFlag(false);
        }
    }, [refreshFlag]); // loginUser が変更されたときにのみ実行

    // データ取得完了後にローディングを解除
    useEffect(() => {
        if (accountList.length > 0) {
            setIsLoading(false);
        }
    }, [accountList]);

    // ユーザカードクリック時
    const handleFriendCardClick = useCallback((friend) => {
        setSelectedFriend(friend);
        onOpen();
    }, [onOpen]);


    // フレンドリストからfriend_idを抽出
    const friendIds = friends_relation.map(friend => friend.friend_id);
    // alert("Friend IDs: " + friendIds.join(", "));

    return (
        <Box
            m="auto"
            pt={10}
            maxW="100%"
            w="8xl"
            // h={{ base: "md", sm: "sm", md: "xl", lg: "2xl", "2xl": "3xl" }}
            h="70vh"
            mt={10}
            display="flex"
            flexDirection="column"
            overflowY="auto" // 垂直方向にスクロール
            overflowX="hidden" // 水平方向にはみ出さないようにする
            sx={{
                // スクロールバーを非表示にする
                "&::-webkit-scrollbar": {
                    display: "none", // Webkit系ブラウザ（Chrome, Safari）
                },
                scrollbarWidth: "none", // Firefox
                msOverflowStyle: "none" // IE 及び Edge
            }}
        >

            {isLoading ? (
                <Center h="100vh" w="100vw" flexDirection="column">
                    <Spinner size="xl" color="white" thickness="4px" speed="0.65s" />
                    <Text mt={4} color="white" fontSize="xl">
                        ロード中...
                    </Text>
                </Center>
            ) : (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ width: "100%", height: "100%" }}
                >
                    <SimpleGrid columns={{ base: 1, sm: 4, md: 6, lg: 8 }} spacing={10} p={5}>
                        {accountList.map((account, index) => (
                            <motion.div
                                key={account.id}
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Box position="relative">
                                    <FriendCard
                                        friend_id={account.id}
                                        img={account.img}
                                        fullName={account.fullname}
                                        old={account.old}
                                        diving_history={account.diving_history}
                                        license={account.license}
                                        login_user_id={loginUser?.id}
                                        setRefreshFlag={() => setRefreshFlag(true)} // フラグを設定
                                        follow={friendIds.includes(account.id)}
                                        onClick={() => handleFriendCardClick(account)}
                                    />
                                    {friendIds.includes(account.id) && (
                                        <HeartAnimation
                                            position="absolute"
                                            top={-4}
                                            left={-1}
                                            color="yellow"
                                            p={1}
                                            variants={heartVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                        >
                                            <Center>
                                                <Icon as={FcLike} w={10} h={10} color="white" />
                                            </Center>
                                        </HeartAnimation>
                                    )}
                                </Box>
                            </motion.div>
                        ))}
                    </SimpleGrid>
                </motion.div>
            )}

        {/* フレンド情報のモーダル表示 */}
        <FriendProfileModal
          isOpen={isOpen}
          onClose={onClose}
          friend={selectedFriend}
        />

        </Box>
    );
});
