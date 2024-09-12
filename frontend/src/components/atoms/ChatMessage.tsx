import { memo, VFC, useState, useCallback, useEffect,ChangeEvent } from "react"
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
import { AiOutlineSend } from "react-icons/ai"
import { ChatMessageType } from "../../types/api/chatMessageType"
import { User } from "../../types/api/user"
import { motion, AnimatePresence } from "framer-motion";
import { useChatMessage } from "../../hooks/useChatMessage";

interface ChatMessageProps {
    chatPartner: User;
    loginUser: User;

}

const MotionBox = motion(Flex);

export const ChatMessage: VFC<ChatMessageProps> = memo(({ chatPartner, loginUser }) => {

    const [newMessage, setNewMessage] = useState(""); // メッセージのState

    //Hooks
    const { getFriendList, friendList, getChatMessage, chatMessage, sendMessage } = useChatMessage();

    // メッセージ入力時にstateを更新
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewMessage(e.target.value);
    };

    // メッセージ送信処理
    const handleSendMessage = useCallback(() => {
        if (!newMessage.trim()) return; // 空のメッセージは送信しない
        sendMessage(loginUser?.id, chatPartner?.id, newMessage)
            .then(() => { getChatMessage(loginUser?.id, chatPartner?.id); }) // メッセージ送信後にチャットメッセージを取得
            .catch((error) => console.error("Failed to send message:", error)); // エラーハンドリング
        setNewMessage(""); // 送信後に入力欄をクリア
    }, [newMessage, loginUser?.id, chatPartner?.id, getChatMessage, chatMessage]);

    // チャットメッセージ
    useEffect(() => {
        if (true) {
            getChatMessage(loginUser?.id, chatPartner?.id);
        }
    }, [loginUser?.id, chatPartner?.id]);


    return (
        <>
            <Flex direction="column" minHeight="100vh" justifyContent="space-between">
                {/* チャットメッセージの表示エリア */}
                <Box p={4} flex="1" overflowY="auto">
                    <AnimatePresence>
                        {chatMessage.map((message, index) => (
                            <MotionBox
                                key={index}
                                direction="row"
                                mb={4}
                                align="center"
                                justify={message.sender_id === loginUser.id ? "flex-end" : "flex-start"}
                                w="100%"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 1 }}
                            >
                                {message.sender_id === loginUser?.id ? (
                                    <>
                                        <Flex maxW="60%" direction="row">
                                            <Box mr={3}>
                                                <Box bg="pink.200" p={4} color="gray.700" borderRadius="lg" fontSize="xl">
                                                    {message.message}
                                                </Box>
                                                <Text color="white">{message.sent_at}</Text>
                                            </Box>
                                            <Box w="20%">
                                                <Image
                                                    src={loginUser?.img}
                                                    boxSize="50px"
                                                    objectFit="cover"
                                                    borderRadius="full"
                                                    borderWidth="2px"
                                                    borderColor="gray.600"
                                                    borderStyle="solid"
                                                    mr={3}
                                                />
                                            </Box>
                                        </Flex>
                                    </>
                                ) : (
                                    <>
                                        <Box>
                                            <Image
                                                src={chatPartner?.img}
                                                boxSize="50px"
                                                objectFit="cover"
                                                borderRadius="full"
                                                borderWidth="2px"
                                                borderColor="gray.600"
                                                borderStyle="solid"
                                                mr={3}
                                            />
                                        </Box>
                                        <Box maxW="60%">
                                            <Box bg="green.100" p={4} color="gray.700" borderRadius="lg" fontSize="xl">
                                                {message.message}
                                            </Box>
                                            <Text color="white">{message.sent_at}</Text>
                                        </Box>
                                    </>
                                )}
                            </MotionBox>
                        ))}
                    </AnimatePresence>
                </Box>

                {/* チャット入力欄 */}
                <Box
                    position="sticky"
                    bottom="0"
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                    bg="rgba(31, 41, 55, 0.8)"
                >
                    <Flex>
                        <Input
                            placeholder="メッセージを入力"
                            borderRadius="md"
                            mr={2} // 送信ボタンとの余白
                            bg="whiteAlpha.900"
                            value={newMessage} // 入力値を表示
                            onChange={handleInputChange} // 入力変更時に呼び出し
                        />
                        <Button
                            colorScheme="blue"
                            borderRadius="md"
                            rightIcon={<Icon as={AiOutlineSend} />}
                            onClick={handleSendMessage}
                        >
                            送信
                        </Button>
                    </Flex>
                </Box>
            </Flex>
        </>
    )
});