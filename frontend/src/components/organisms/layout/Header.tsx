import {Box,Flex,Heading,Link,Center,Text,Spacer,Button,Stack,Image,Icon,Drawer,DrawerBody,DrawerContent,DrawerOverlay,DrawerHeader,DrawerFooter,useDisclosure} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import {memo,VFC,useCallback,useContext} from "react";
import {IconButton} from "@chakra-ui/button";
//Reactのアイコン管理コンポーネント
import { FcBiotech,FcBusinesswoman,FcBusinessman,FcSearch,FcLike,FcCloseUpMode,FcLinux,FcManager  } from "react-icons/fc";

import {MenuDrawer} from "../../molecules/MenuDrawer"
import { loginUserState } from "../../../provider/LoginUserProvider";
import { useRecoilValue } from "recoil";

import logoIcon from "../../../image/yasinoki.png";

export const Header:VFC = memo(() => {

    const {isOpen, onOpen,onClose} = useDisclosure();

    const loginUser = useRecoilValue(loginUserState);

    return (
        <>
        
            <Flex as="nav" bg="orange.300" h="10vh" align="center" color="white" justify="space-between" boxShadow="dark-lg" rounded="md">


                    <Heading fontFamily="'Arizonia', cursive" letterSpacing="0.1em"  as="h1" fontSize="6xl" ml="10" bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text" fontWeight="extrabold">Diving App New</Heading>
                
                    <Flex>
                        <Center>
                        <Icon as={FcManager} w={10} h={10} mr={5} color="orange.500"/>
                        <Text letterSpacing={5} fontSize="xl" maxW={200} isTruncated>{loginUser?.fullname}</Text>
                        </Center>
                    </Flex>
                <Box>
                    <Stack spacing={10} direction="row" mr="10">
                        <IconButton aria-label="メニューボタン" colorScheme="orange" icon={<HamburgerIcon/>} size="lg" boxShadow="lg" onClick={onOpen}/>
                    </Stack>
                </Box>
            </Flex>

            {/* サイドバーを表示するコンポーネント */}
            <MenuDrawer onClose={onClose} isOpen={isOpen} />

        </>
    )
});