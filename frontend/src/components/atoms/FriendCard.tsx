import { VFC, useCallback, memo } from "react";
import { Box, Image, Text, Stack, Badge, Center, Icon, Button } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { GiRibbonMedal } from "react-icons/gi";
import { GiStarMedal } from "react-icons/gi";
import { RiMedalFill } from "react-icons/ri";
import { IoIosMedal } from "react-icons/io";
import { IoMedal } from "react-icons/io5";
import { GiMedal } from "react-icons/gi";
import { useMessage } from "../../hooks/useMessage";
import { useGetAccountList } from "../../hooks/useGetAccountList"
import axiosInstance from "../../api/axiosInstance";
import bgImage from '../../image/umi.jpeg'; // 画像ファイルのパスに応じて変更


interface FriendCardProps {
    friend_id: number;
    img: string;
    fullName: string;
    old: number;
    diving_history: number;
    license: string;
    login_user_id: number;
    setRefreshFlag: () => void; // 追加
    follow: boolean;
    onClick: () => void; // onClickプロパティを追加
}

export const FriendCard: VFC<FriendCardProps> = memo(({ friend_id, img, fullName, old, diving_history, license, login_user_id, setRefreshFlag, follow,onClick }) => {
    // トーストを表示する
    const { showMessage } = useMessage();

    // フォローボタンイベント
    const onAddFriendRelation = useCallback((event) => {
        event.stopPropagation(); // BoxのonClickイベントをキャンセル
        axiosInstance.post("/addFriendRelation", {
            login_user_id: login_user_id,
            friend_id: friend_id
        })
            .then(() => {
                // 成功メッセージ
                showMessage({ title: "フォローしました", status: "success" });
                setRefreshFlag(); // 親コンポーネントのフラグを設定
            })
            .catch((error) => {
                // エラーハンドリング
                console.error("フォロー登録エラー:", error);
                showMessage({ title: "フォローに失敗しました", status: "error" });
            });
    }, [friend_id, login_user_id, showMessage]);

    // licenseに応じたアイコンと色を選択するロジック
    const getIconAndColorForLicense = (license: string) => {
        switch (license) {
            case 'OWD':
                return { icon: GiRibbonMedal, color: 'blue.500' };
            case 'AWD':
                return { icon: RiMedalFill, color: 'green.500' };
            case 'RED':
                return { icon: IoIosMedal, color: 'red.500' };
            case 'MSD':
                return { icon: IoMedal, color: 'purple.500' };
            case 'DM':
                return { icon: GiMedal, color: 'orange.500' };
            case 'SP':
                return { icon: GiStarMedal, color: 'yellow.500' };
            default:
                return { icon: FaStar, color: 'gray.500' }; // デフォルトアイコンと色
        }
    };

    const { icon: LicenseIcon, color: LicenseColor } = getIconAndColorForLicense(license);

    return (
        <Box
            borderRadius="lg"
            overflow="hidden"
            bgImage={`url(${bgImage})`}
            bgSize="cover" // 画像をカード全体にカバーする
            bgPosition="center" // 画像の位置をカードの中心に
            shadow="md"
            width="160px"
            mx="auto"
            p={4}
            position="relative"
            transition="transform 0.2s"
            _hover={{ transform: "scale(1.05)", cursor: "pointer", opacity: 0.9 }}
            onClick={onClick} // onClickイベントを追加
        >
            <Box position="relative">
                <Image
                    src={img}
                    alt={`${fullName}'s profile picture`}
                    boxSize="100px"
                    objectFit="cover"
                    borderRadius="full"
                    mx="auto"
                    borderWidth="2px"
                    borderColor="gray.600"
                    borderStyle="solid" // 枠線のスタイルを指定
                />
                <Box
                    position="absolute"
                    top={-3} // アイコンの位置をカードの外に出すため調整
                    right={-3} // アイコンの位置をカードの外に出すため調整
                    bg={LicenseColor}
                    borderRadius="full"
                    p={1}
                    shadow="xl"
                    borderWidth="2px"
                    borderColor="gray.400"
                >
                    <Center>
                        <Text color="white">{license}</Text>
                        <Icon as={LicenseIcon} w={8} h={8} color="white" />
                    </Center>
                </Box>
            </Box>
            <Stack spacing={1} mt={4} p={1}  borderRadius="lg">
                <Center>
                    <Text fontWeight="bold" fontSize="sm" isTruncated>{fullName}</Text>
                </Center>
                <Center>
                    <Text fontWeight="bold" fontSize="sm" isTruncated> {old}歳</Text>
                </Center>
                <Center>
                    <Text fontWeight="bold" fontSize="sm" isTruncated>歴: {diving_history}年</Text>
                </Center>
            </Stack>
            <Button
                mt={4}
                bg="blue.500" // ボタンの背景色を青に設定
                color="white" // ボタンの文字色を白に設定
                width="100%" // 横幅を最大に
                borderRadius="full" // ボタンの丸みをなくす
                _hover={{ bg: "blue.600" }} // ホバー時の背景色を濃い青に設定
                onClick={onAddFriendRelation}
                isDisabled={follow}
            >
                {follow ? (<Text>フォロー済</Text>) : (<Text>フォロー</Text>)}
            </Button>
        </Box>
    );
});