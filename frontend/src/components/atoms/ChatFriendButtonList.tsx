import { memo, VFC } from "react"
import {
    Input,
    Box,
    Flex,
    Stack,
    Center, Divider, Image, Heading, InputGroup, InputLeftAddon, Text, Spacer, HStack, RadioGroup, Radio, Square, Icon, Select, Textarea, Button, useDisclosure, AlertDialog
} from "@chakra-ui/react"
import { motion, AnimatePresence } from "framer-motion";

interface ChatFriendButonListProps {
    friend_id: number;
    fullname: string;
    img: string;
    onClick: (fullname:number) => void;

}

const MotionBox = motion(Flex);

export const ChatFriendButonList: VFC<ChatFriendButonListProps> = memo(({ friend_id, fullname, img,onClick }) => {

    return (
        <>
            <Button
                key={friend_id}
                mb={2}
                colorScheme="gray"
                onClick={() => onClick(friend_id)}
                fontSize="lg" // 大きめのフォントサイズ
                p={6} // 大きめのパディング
                borderRadius="md" // ボタンの角を丸くする
                height="60px" // 高さを固定
                variant="outline" // 選択状態のスタイル
                color="gray.300" // 文字色を変更
                bg="gray.700" // 背景色を変更
            >
                <Flex align="center" gap={10}> {/* Flexを使って画像とテキストを横並びにし、gapでスペースを追加 */}
                    <Image
                        src={img}
                        boxSize="50px"
                        objectFit="cover"
                        borderRadius="full"
                        borderWidth="2px"
                        borderColor="gray.600"
                        borderStyle="solid" // 枠線のスタイルを指定
                        mr={3}
                    />
                    <Text>{fullname}</Text>
                </Flex>
            </Button>
        </>
    )
});