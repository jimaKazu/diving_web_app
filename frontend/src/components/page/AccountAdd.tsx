import { memo, VFC, ChangeEvent, useState, useRef } from "react";
import {
    Box, Image, Center, Flex, Heading, Icon, Text, Stack, FormControl, FormLabel, Input, Divider, Select, NumberInput, NumberInputField
    , NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Textarea, Button, AlertDialogOverlay, AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter, useDisclosure
} from "@chakra-ui/react";
import { Scrollbar } from "react-scrollbars-custom";
import companyIcon from "../../image/summer-6877.gif";
import { useMessage } from "../../hooks/useMessage";
import axiosInstance from "../../api/axiosInstance";
import ReactImageBase64 from 'react-image-base64';

export const AccountAdd: VFC = memo(() => {

    //トーストを表示する
    const { showMessage } = useMessage();
    //ダイアログ設定
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef(null)

    //State
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [license, setLicense] = useState('');
    const [diveCnt, setDiveCnt] = useState(0);
    const [old, setOld] = useState(0);
    const [fromAddress, setFromAddress] = useState('');
    const [divingHistory, setDivingHistory] = useState(0);
    const [likeDivingSpots, setLikeDivingSpots] = useState('');
    const [likefish, setLikeFish] = useState('');
    const [selfIntroduction, setIntroduction] = useState('');
    const [img, setImg] = useState('');
    const [imgSize, setImgSize] = useState(0);
    //各プロパティの値が変更されたら各ステートも更新する
    const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)
    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
    const onChangeFullName = (e: ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)
    const onChangeLicense = (e: ChangeEvent<HTMLSelectElement>) => setLicense(e.target.value)
    const onChangeDiveCnt = (e: ChangeEvent<HTMLInputElement>) => setDiveCnt(Number(e.target.value))
    const onChangeOld = (e: ChangeEvent<HTMLInputElement>) => setOld(Number(e.target.value))
    const onChangeFromAddress = (e: ChangeEvent<HTMLInputElement>) => setFromAddress(e.target.value)
    const onChangeDivingHistory = (e: ChangeEvent<HTMLInputElement>) => setDivingHistory(Number(e.target.value))
    const onChangeLikeDivingSpots = (e: ChangeEvent<HTMLInputElement>) => setLikeDivingSpots(e.target.value)
    const onChangeLikeFish = (e: ChangeEvent<HTMLInputElement>) => setLikeFish(e.target.value)
    const onChangeSelfIntroduction = (e: ChangeEvent<HTMLTextAreaElement>) => setIntroduction(e.target.value)

    //アカウント登録処理
    const handleRegist = () => {

        axiosInstance.post("/accountInsert", {
            username: username,
            password: password,
            fullName: fullName,
            license: license,
            diveCnt: diveCnt,
            old: old,
            fromAddress: fromAddress,
            divingHistory: divingHistory,
            likeDivingSpots: likeDivingSpots,
            likefish: likefish,
            selfIntroduction: selfIntroduction,
            img: img
        });

        showMessage({ title: "アカウントを登録しました", status: "success" })
    };


    return (
        <>
            <Flex bg="orange.300" w="100vw" h="10vh" align="center" boxShadow="dark-lg">
                <Box as="a" >
                    {/* "sm" | "md" | "lg" | "xl" | "2xl" | "xs" | "3xl" | "4xl" */}
                    <Heading as="h1" fontSize="5xl" ml="10" bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text" fontWeight="extrabold">Diving App</Heading>
                </Box>
            </Flex>

            <Box w="100vw" h="90vh" backgroundImage={`url(${companyIcon})`} // 背景画像にGIFを設定
                backgroundSize="cover" // 背景画像がBox全体にフィットするように設定
                backgroundPosition="center" // 背景画像を中央に配置
                pt={10}
            >
                <Box
                    m="auto"
                    pt={10}
                    w="4xl"
                    // h={{ base: "md", sm: "sm", md: "xl", lg: "2xl", "2xl": "3xl" }}
                    h="80vh"
                    maxH="100%"
                    borderWidth="1px"
                    borderRadius="3xl"
                    bg="white"
                    shadow="md"
                    display="flex"
                    flexDirection="column"
                >
                    <Center>
                        <Box>
                            <Heading letterSpacing={5} color="orange.500" as="h1" mb={5}>
                                アカウント登録
                            </Heading>
                            <Divider borderColor="orange.200" />
                        </Box>
                    </Center>


                    <Box flex="1" overflow="hidden">
                        <Scrollbar style={{ width: '100%', height: '100%' }}>
                            <Stack spacing={5}>
                                <Center>
                                    <FormControl w="80%">
                                        <FormLabel color="orange.600">＊ユーザネーム</FormLabel>
                                        <Input variant="flushed" w="50%" borderBottomColor="gray.200" isInvalid={username === ""} errorBorderColor="red.300" onChange={onChangeUserName} />
                                    </FormControl>
                                </Center>
                                <Center>
                                    <FormControl w="80%">
                                        <FormLabel color="orange.600">＊パスワード</FormLabel>
                                        <Input type="password" variant="flushed" w="50%" borderBottomColor="gray.200" isInvalid={password === ""} errorBorderColor="red.300" onChange={onChangePassword} />
                                    </FormControl>
                                </Center>
                                <Center>
                                    <FormControl w="80%">
                                        <FormLabel color="orange.600">＊名前</FormLabel>
                                        <Input variant="flushed" w="50%" borderBottomColor="gray.200" isInvalid={fullName === ""} errorBorderColor="red.300" onChange={onChangeFullName} />
                                    </FormControl>
                                </Center>
                                <Center >
                                    <FormControl w="80%">
                                        <FormLabel color="orange.600">ライセンス</FormLabel>
                                        <Select w="10%" variant="flushed" borderBottomColor="gray.200" onChange={onChangeLicense}>
                                            <option value="なし">なし</option>
                                            <option value="OWD">OWD</option>
                                            <option value="AWD">AWD</option>
                                            <option value="RED">RED</option>
                                            <option value="MSD">MSD</option>
                                            <option value="DM">DM</option>
                                            <option value="SP">SP</option>
                                        </Select>
                                    </FormControl>
                                </Center>
                                <Center>
                                    <FormControl w="80%">
                                        <FormLabel color="orange.600">ダイブ数</FormLabel>
                                        <Flex>
                                            <NumberInput variant="flushed" w="10%" borderBottomColor="gray.200">
                                                <NumberInputField onChange={onChangeDiveCnt} />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                            <Text color="gray">回</Text>
                                        </Flex>
                                    </FormControl>
                                </Center>
                                <Center>
                                    <FormControl w="80%">
                                        <FormLabel color="orange.600">年齢</FormLabel>
                                        <Flex>
                                            <NumberInput variant="flushed" w="10%" borderBottomColor="gray.200">
                                                <NumberInputField onChange={onChangeOld} />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                            <Text color="gray">歳</Text>
                                        </Flex>
                                    </FormControl>
                                </Center>
                                <Center>
                                    <FormControl w="80%">
                                        <FormLabel color="orange.600">居住地</FormLabel>
                                        <Input variant="flushed" w="20%" borderBottomColor="gray.200" onChange={onChangeFromAddress} />
                                    </FormControl>
                                </Center>
                                <Center>
                                    <FormControl w="80%">
                                        <FormLabel color="orange.600">ダイビング歴</FormLabel>
                                        <Flex>
                                            <NumberInput variant="flushed" w="10%" borderBottomColor="gray.200">
                                                <NumberInputField onChange={onChangeDivingHistory} />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                            <Text color="gray">年</Text>
                                        </Flex>
                                    </FormControl>
                                </Center>
                                <Center>
                                    <FormControl w="80%">
                                        <FormLabel color="orange.600">好きなダイビングスポット</FormLabel>
                                        <Input variant="flushed" w="50%" borderBottomColor="gray.200" onChange={onChangeLikeDivingSpots} />
                                    </FormControl>
                                </Center>
                                <Center>
                                    <FormControl w="80%">
                                        <FormLabel color="orange.600">好きな魚</FormLabel>
                                        <Input variant="flushed" w="50%" borderBottomColor="gray.200" onChange={onChangeLikeFish} />
                                    </FormControl>
                                </Center>
                                <Center>
                                    <Box w="80%">
                                        <Text letterSpacing={1} color="orange.600">自己紹介</Text>
                                        <Textarea border="1px" borderColor="gray.200" onChange={onChangeSelfIntroduction} />
                                    </Box>
                                </Center>
                                <Center>
                                    <ReactImageBase64
                                        maxFileSize={104857600}
                                        thumbnail_size={300}
                                        drop={true}
                                        dropText="ファイルをドラッグ＆ドロップもしくは"
                                        capture="environment"
                                        multiple={true}
                                        handleChange={data => {
                                            if (data.result) {
                                                setImgSize(data.fileSize!)
                                                setImg(data.fileData!)
                                            } else {
                                                alert("画像をアップロードできません")
                                            }
                                        }}
                                    />
                                    <Image src={img} />
                                </Center>
                            </Stack>
                        </Scrollbar>
                    </Box>
                    <Flex justify="right">
                        <Button mr="20" bg="orange.500" colorScheme="orange" color="white" size="md" isDisabled={
                            (username === "") ||
                            (password === "") ||
                            (fullName === "")
                        } onClick={onOpen}>
                            登　録
                        </Button>
                    </Flex>
                    <Flex mr="20" justify="right">
                        <Text color="red.500">必須項目 * は全て入力してください</Text>
                    </Flex>
                </Box>


                {/* 登録ダイアログ */}
                <AlertDialog motionPreset="slideInBottom" leastDestructiveRef={cancelRef} onClose={onClose} isOpen={isOpen} isCentered>
                    <AlertDialogOverlay />
                    <AlertDialogContent bg="white">
                        <AlertDialogHeader>アカウントを登録しますか?</AlertDialogHeader>
                        <AlertDialogCloseButton />
                        <AlertDialogBody >
                            アカウントを登録するときは「はい」：登録しないときは「いいえ」を選択してください。
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button bg="orange.500" colorScheme="orange" color="white" onClick={handleRegist}>
                                はい
                            </Button>
                            <Button bg="orange.500" colorScheme="orange" color="white" ml={3} ref={cancelRef} onClick={onClose}>
                                いいえ
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </Box>
        </>
    );
});