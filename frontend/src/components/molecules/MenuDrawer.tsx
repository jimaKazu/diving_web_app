import { memo, VFC, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Button, Drawer, DrawerBody, DrawerContent, DrawerOverlay, DrawerHeader, DrawerFooter, Icon, Stack, useDisclosure } from "@chakra-ui/react";
import { FcBiotech, FcBusinesswoman, FcBusinessman, FcSearch, FcLike, FcCloseUpMode, FcLinux, FcManager } from "react-icons/fc";
import { useLoginAuth } from "../../hooks/useLoginAuth";

// Props定義
type Props = {
    onClose: () => void;
    isOpen: boolean;
}

// サイドバー
export const MenuDrawer: VFC<Props> = memo((props) => {
    // Props取得
    const { onClose, isOpen } = props;

    //ログアウト処理
    const { logout } = useLoginAuth();

    // 画面遷移処理
    const history = useHistory();
    const onClickProfilePage = useCallback(() => history.push("/profile"), [history]);
    const onClickFriendListPage = useCallback(() => history.push("/friendList"), [history]);
    const onClickLogAddPage = useCallback(() => history.push("/logAdd"), [history]);
    const onClickDivingSpotsPage = useCallback(() => history.push("/divingSpots"), [history]);
    const onClickFishListPage = useCallback(() => history.push("/fishList"), [history]);

    return (
        <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay>
                <DrawerContent>
                    <DrawerHeader pt={10} textAlign="center" color="red.500" letterSpacing={6} w="100%" bg="orange.100">
                        サイドメニュー
                    </DrawerHeader>
                    <DrawerBody pt="10" bg="orange.100">
                        <Stack spacing={5}>
                            <Button letterSpacing={3} w="100%" bg="orange.200" color="blue.400" onClick={onClickProfilePage}><Icon as={FcBiotech} w={10} h={10} mr={10} color="orange.500" />プロフィール　　　</Button>
                            <Button letterSpacing={3} w="100%" bg="orange.200" color="blue.400" onClick={onClickFriendListPage}><Icon as={FcBusinesswoman} w={10} h={10} mr={10} color="orange.500" />フレンド一覧　　　</Button>
                            <Button letterSpacing={3} w="100%" bg="orange.200" color="blue.400" onClick={onClickLogAddPage}><Icon as={FcLike} w={10} h={10} mr={10} color="orange.500" />ログ登録　　　　　</Button>
                            <Button letterSpacing={3} w="100%" bg="orange.200" color="blue.400" onClick={onClickDivingSpotsPage}><Icon as={FcCloseUpMode} w={10} h={10} mr={10} color="orange.500" />ダイビングスポット</Button>
                            <Button letterSpacing={3} w="100%" bg="orange.200" color="blue.400" onClick={onClickFishListPage} isDisabled={true}><Icon as={FcLinux} w={10} h={10} mr={10} color="orange.500" />お魚一覧　　　　　</Button>
                            <Button letterSpacing={3} w="100%" bg="orange.200" color="blue.400" onClick={logout}><Icon as={FcLinux} w={10} h={10} mr={10} color="orange.500" />ログアウト　　　　</Button>
                        </Stack>
                    </DrawerBody>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>

    );
});
