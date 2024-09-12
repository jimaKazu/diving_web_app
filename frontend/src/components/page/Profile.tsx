import { memo, VFC, useCallback, useState, ChangeEvent } from "react";
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
} from "@chakra-ui/react";
import { BsFillCaretDownFill, BsAwardFill } from "react-icons/bs";
import { FcElectricalSensor, FcBusinessman, FcReadingEbook } from "react-icons/fc";
import { AiOutlineSetting } from "react-icons/ai";
import { Scrollbar } from "react-scrollbars-custom"; // Ensure this is installed and used correctly
import companyIcon from "../../image/summer-6877.gif";
import bgImage from "../../image/yasinoki02.jpg";
import { loginUserState } from "../../provider/LoginUserProvider";
import { useRecoilValue } from "recoil";
import { useAccount } from "../../hooks/useAccount";
import ReactImageBase64 from 'react-image-base64';
import { motion } from 'framer-motion';

// `motion` でラップすることで、アニメーションを適用できます
const AnimatedBox = motion(Box);

export const Profile: VFC = memo(() => {
  //ログインアカウントを取得する
  const loginUser = useRecoilValue(loginUserState);

  const history = useHistory();
  //画面遷移「ログ情報」
  const onClickMyLogInfo = useCallback(() => history.push("/profile/mylog"), [history]);

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { updateAccount, deleteAccount } = useAccount();

  // アカウントを更新するステート
  const updateClick = () => {
    const accountData = {
      username,
      password,
      fullName,
      license,
      diveCnt,
      old,
      fromAddress,
      divingHistory,
      likeDivingSpots,
      likefish,
      selfIntroduction,
      img
    };
    updateAccount(loginUser?.id!, accountData);
  };

  // アカウントを削除するステート
  const deleteClick = () => {
    deleteAccount(loginUser?.id);
  };

  // UseState
  //State
  const [username, setUserName] = useState(loginUser?.username || '');
  const [password, setPassword] = useState(loginUser?.password || '');
  const [fullName, setFullName] = useState(loginUser?.fullname || '');
  const [license, setLicense] = useState(loginUser?.license || '');
  const [diveCnt, setDiveCnt] = useState(loginUser?.dive_cnt || 0);
  const [old, setOld] = useState(loginUser?.old || 0);
  const [fromAddress, setFromAddress] = useState(loginUser?.fromAddress || '');
  const [divingHistory, setDivingHistory] = useState(loginUser?.diving_history || 0);
  const [likeDivingSpots, setLikeDivingSpots] = useState(loginUser?.like_diving_spots || '');
  const [likefish, setLikeFish] = useState(loginUser?.like_fish || '');
  const [selfIntroduction, setIntroduction] = useState(loginUser?.profile || '');
  const [img, setImg] = useState(loginUser?.img || '');
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

  const onChangeProcessImage = (e: ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files![0];
    const imageUrl = URL.createObjectURL(imageFile);
    setImg(imageUrl)
  }

  return (
    <>
      <Box w="100vw" h="90vh" backgroundImage={`url(${companyIcon})`} // 背景画像にGIFを設定
        backgroundSize="cover" // 背景画像がBox全体にフィットするように設定
        backgroundPosition="center" // 背景画像を中央に配置
        pt={10}
      >
        <AnimatedBox
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
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Stack spacing={5} h="full">
            <Center>
              <Flex>
                <Stack spacing={10} direction="row">
                  <Image
                    src={loginUser?.img}
                    fallbackSrc="https://via.placeholder.com/150"
                    alt="topPic"
                    borderRadius="full"
                    boxSize="170"
                    shadow="dark-lg"
                  />
                  <Box>
                    <Stack spacing={5}>
                      <Center>
                        <Flex>
                          <Heading
                            fontFamily="Franklin Gothic Medium"
                            textShadow="1px 1px"
                            color="gray.600"
                            letterSpacing={5}
                            fontSize="3xl"
                          >
                            {loginUser?.username}
                          </Heading>
                        </Flex>
                      </Center>
                      <Center>
                        <Flex>
                          <Stack direction="row">
                            <Badge fontSize="20" colorScheme="green">
                              <Icon mb={1.5} mr={1} as={FcElectricalSensor} w={5} h={5} />
                              {loginUser?.dive_cnt} dive
                            </Badge>
                            <Badge fontSize="20" colorScheme="red">
                              <Icon mb={1.5} mr={1} as={BsAwardFill} color="orange.300" w={5} h={5} />
                              {loginUser?.license}
                            </Badge>
                          </Stack>
                        </Flex>
                      </Center>
                      <Flex>
                        <Stack spacing={2} direction="row">
                          <Button letterSpacing={1} rightIcon={<BsFillCaretDownFill />} colorScheme="blue" variant="solid">
                            フォロー
                          </Button>
                          <Button letterSpacing={1} rightIcon={<BsFillCaretDownFill />} colorScheme="blue" variant="solid">
                            フォロワー
                          </Button>
                          <Button bg="gray.300" colorScheme="gray.300" onClick={onOpen}>
                            <AiOutlineSetting size={30} color="gray" />
                          </Button>
                        </Stack>
                      </Flex>
                    </Stack>
                  </Box>
                </Stack>
              </Flex>
            </Center>
            <Center>
              <Divider m="auto" w="70%" borderColor="gray.300" />
            </Center>
            <Box flex="1" overflow="auto">
              <Scrollbar style={{ width: '100%', height: 'calc(90vh - 300px)' }}> {/* Adjust height as needed */}
                <Center>
                  <Box w="70%">
                    <Text letterSpacing={1} color="gray.500">
                      自己紹介
                    </Text>
                    <Textarea isDisabled placeholder="No profile" value={loginUser?.profile} />
                  </Box>
                </Center>
                <Center>
                  <Divider m="auto" w="70%" borderColor="gray.300" />
                </Center>
                <Center>
                  <Box w="70%" mt={5}>
                    <Text color="gray.500">プロフィール</Text>
                    <Table variant="" colorScheme="">
                      <Tbody>
                        <Tr borderBottom="1px solid" borderColor="gray.200">
                          <Td color="gray.500">
                            <Icon pb={1} as={FcReadingEbook} w={8} h={8} />
                            名前
                          </Td>
                          <Td color="gray.500">{loginUser?.fullname}</Td>
                        </Tr>
                        <Tr borderBottom="1px solid" borderColor="gray.200">
                          <Td color="gray.500">
                            <Icon pb={1} as={FcReadingEbook} w={8} h={8} />
                            年齢
                          </Td>
                          <Td color="gray.500">{loginUser?.old}</Td>
                        </Tr>
                        <Tr borderBottom="1px solid" borderColor="gray.200">
                          <Td color="gray.500">
                            <Icon pb={1} as={FcReadingEbook} w={8} h={8} />
                            居住地
                          </Td>
                          <Td color="gray.500">{loginUser?.fromAddress}</Td>
                        </Tr>
                        <Tr borderBottom="1px solid" borderColor="gray.200">
                          <Td color="gray.500">
                            <Icon pb={1} as={FcReadingEbook} w={8} h={8} />
                            ダイビング歴
                          </Td>
                          <Td color="gray.500">{loginUser?.diving_history}</Td>
                        </Tr>
                        <Tr borderBottom="1px solid" borderColor="gray.200">
                          <Td color="gray.500">
                            <Icon pb={1} as={FcReadingEbook} w={8} h={8} />
                            好きなダイビングスポット
                          </Td>
                          <Td color="gray.500">{loginUser?.like_diving_spots}</Td>
                        </Tr>
                        <Tr borderBottom="1px solid" borderColor="gray.200">
                          <Td color="gray.500">
                            <Icon pb={1} as={FcReadingEbook} w={8} h={8} />
                            好きな魚
                          </Td>
                          <Td color="gray.500">{loginUser?.like_fish}</Td>
                        </Tr>
                      </Tbody>
                    </Table>
                    <Button letterSpacing={5} mt={5} w="100%" colorScheme="blue" variant="solid" onClick={onClickMyLogInfo}>
                      過去ログを見る
                    </Button>
                  </Box>
                </Center>
              </Scrollbar>
              <Text>　</Text>
            </Box>
          </Stack>
        </AnimatedBox>
      </Box>



      {/* ----------------------------------------------------------------------------------------------------------------------------------------------------------- */}



      <Modal size="xl" isOpen={isOpen} onClose={onClose} autoFocus={false} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent bg="pink.50" pb={2}>
          <ModalHeader textAlign="center">アカウント情報編集</ModalHeader>
          <ModalCloseButton></ModalCloseButton>
          <ModalBody>
            <Scrollbar style={{ width: 550, height: '70vh' }}>
              <Center>
                <Box w="100%" mt={5}>
                  <Stack spacing={5}>
                    <Center>
                      <FormControl w="90%">
                        <Flex align="center">
                          <Icon pb={1} as={FcReadingEbook} w={8} h={8} />
                          <FormLabel color="orange.600" mb={0} w="30%">
                            ユーザネーム
                          </FormLabel>
                          <Input
                            variant="flushed"
                            w="40%"
                            borderBottomColor="gray.200"
                            isInvalid={username === ""}
                            errorBorderColor="red.300"
                            onChange={onChangeUserName}
                            value={username}
                          />
                        </Flex>
                      </FormControl>
                    </Center>
                    <Center>
                      <FormControl w="90%">
                        <Flex align="center">
                          <Icon pb={1} as={FcReadingEbook} w={8} h={8} />
                          <FormLabel color="orange.600" mb={0} w="30%">
                            パスワード
                          </FormLabel>
                          <Input
                            type="password"
                            variant="flushed"
                            w="40%"
                            borderBottomColor="gray.200"
                            isInvalid={password === ""}
                            errorBorderColor="red.300"
                            onChange={onChangePassword}
                            value={password}
                          />
                        </Flex>
                      </FormControl>
                    </Center>
                    <Center>
                      <FormControl w="90%">
                        <Flex align="center">
                          <Icon pb={1} as={FcReadingEbook} w={8} h={8} />
                          <FormLabel color="orange.600" mb={0} w="30%">
                            名前
                          </FormLabel>
                          <Input
                            variant="flushed"
                            w="40%"
                            borderBottomColor="gray.200"
                            isInvalid={fullName === ""}
                            errorBorderColor="red.300"
                            onChange={onChangeFullName}
                            value={fullName}
                          />
                        </Flex>
                      </FormControl>
                    </Center>
                    <Center>
                      <FormControl w="90%">
                        <Flex align="center">
                          <Icon pb={1} as={FcReadingEbook} w={8} h={8} />
                          <FormLabel color="orange.600" mb={0} w="30%">
                            ライセンス
                          </FormLabel>
                          <Select
                            w="30%"
                            variant="flushed"
                            borderBottomColor="gray.200"
                            onChange={onChangeLicense}
                            value={license}
                          >
                            <option value="なし">なし</option>
                            <option value="OWD">OWD</option>
                            <option value="AWD">AWD</option>
                            <option value="RED">RED</option>
                            <option value="MSD">MSD</option>
                            <option value="DM">DM</option>
                            <option value="SP">SP</option>
                          </Select>
                        </Flex>
                      </FormControl>
                    </Center>
                    <Center>
                      <FormControl w="90%">
                        <Flex align="center">
                          <Icon pb={1} as={FcReadingEbook} w={8} h={8} />
                          <FormLabel color="orange.600" mb={0} w="30%">
                            ダイブ数
                          </FormLabel>
                          <Flex w="30%">
                            <NumberInput
                              variant="flushed"
                              w="80%"
                              borderBottomColor="gray.200"
                              value={diveCnt}
                            >
                              <NumberInputField onChange={onChangeDiveCnt} value={diveCnt} />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                            <Text color="gray">回</Text>
                          </Flex>
                        </Flex>
                      </FormControl>
                    </Center>
                    <Center>
                      <FormControl w="90%">
                        <Flex align="center">
                          <Icon pb={1} as={FcReadingEbook} w={8} h={8} />
                          <FormLabel color="orange.600" mb={0} w="30%">
                            年齢
                          </FormLabel>
                          <Flex w="30%">
                            <NumberInput
                              variant="flushed"
                              w="80%"
                              borderBottomColor="gray.200"
                              value={old}
                            >
                              <NumberInputField onChange={onChangeOld} />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                            <Text color="gray">歳</Text>
                          </Flex>
                        </Flex>
                      </FormControl>
                    </Center>
                    <Center>
                      <FormControl w="90%">
                        <Flex align="center">
                          <Icon pb={1} as={FcReadingEbook} w={8} h={8} />
                          <FormLabel color="orange.600" mb={0} w="30%">
                            居住地
                          </FormLabel>
                          <Input
                            variant="flushed"
                            w="30%"
                            borderBottomColor="gray.200"
                            onChange={onChangeFromAddress}
                            value={fromAddress}
                          />
                        </Flex>
                      </FormControl>
                    </Center>
                    <Center>
                      <FormControl w="90%">
                        <Flex align="center">
                          <Icon pb={1} as={FcReadingEbook} w={8} h={8} />
                          <FormLabel color="orange.600" mb={0} w="30%">
                            ダイビング歴
                          </FormLabel>
                          <Flex w="30%">
                            <NumberInput
                              variant="flushed"
                              w="80%"
                              borderBottomColor="gray.200"
                              value={divingHistory}
                            >
                              <NumberInputField onChange={onChangeDivingHistory} value={divingHistory} />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                            <Text color="gray">年</Text>
                          </Flex>
                        </Flex>
                      </FormControl>
                    </Center>
                    <Center>
                      <FormControl w="90%">
                        <Flex align="center">
                          <Icon pb={1} as={FcReadingEbook} w={8} h={8} />
                          <FormLabel color="orange.600" mb={0} w="50%">
                            好きなダイビングスポット
                          </FormLabel>
                          <Input
                            variant="flushed"
                            w="60%"
                            borderBottomColor="gray.200"
                            onChange={onChangeLikeDivingSpots}
                            value={likeDivingSpots}
                          />
                        </Flex>
                      </FormControl>
                    </Center>
                    <Center>
                      <FormControl w="90%">
                        <Flex align="center">
                          <Icon pb={1} as={FcReadingEbook} w={8} h={8} />
                          <FormLabel color="orange.600" mb={0} w="30%">
                            好きな魚
                          </FormLabel>
                          <Input
                            variant="flushed"
                            w="50%"
                            borderBottomColor="gray.200"
                            onChange={onChangeLikeFish}
                            value={likefish}
                          />
                        </Flex>
                      </FormControl>
                    </Center>
                    <Center>
                      <Box w="90%">
                        <Text letterSpacing={1} color="orange.600">
                          <Icon pb={1} as={FcReadingEbook} w={8} h={8} />自己紹介
                        </Text>
                        <Textarea
                          border="1px"
                          borderColor="gray.200"
                          onChange={onChangeSelfIntroduction}
                          value={selfIntroduction}
                        />
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
                </Box>
              </Center>
            </Scrollbar>
          </ModalBody>
          <ModalFooter>
            <Flex>
              <Button mr="3" bg="orange.500" colorScheme="orange" color="white" size="md" isDisabled={
                (username === "") ||
                (password === "") ||
                (fullName === "")
              } onClick={updateClick}>
                更新
              </Button>
              <Button mr="" bg="orange.500" colorScheme="orange" color="white" size="md" onClick={deleteClick}>
                削除
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
});









// import { memo, VFC, useCallback } from "react";
// import { useHistory } from "react-router-dom";
// import styled from "styled-components";
// import {
//   Box,
//   Flex,
//   Stack,
//   Center,
//   Divider,
//   Heading,
//   Image,
//   Text,
//   Badge,
//   Button,
//   Icon,
//   Textarea,
//   Table,
//   Tbody,
//   Tr,
//   Td,
// } from "@chakra-ui/react";
// import { BsFillCaretDownFill, BsAwardFill } from "react-icons/bs";
// import { FcElectricalSensor, FcBusinessman, FcReadingEbook } from "react-icons/fc";
// import { Scrollbar } from "react-scrollbars-custom";
// // import { useLoginUser } from "../../hooks/useLoginUser";
// import companyIcon from "../../image/summer-6877.gif";
// import { loginUserState } from "../../provider/LoginUserProvider";
// import { useRecoilValue } from "recoil";

// export const Profile: VFC = memo(() => {
//   //ログインアカウントを取得する
//   const loginUser = useRecoilValue(loginUserState);

//   const history = useHistory();
//   //画面遷移「ログ情報」
//   const onClickMyLogInfo = useCallback(() => history.push("/profile/mylog"), [history]);


//   return (
//     <>
//       <Box position="relative" w="100vw" h="90vh">
//         <Image src={companyIcon} boxShadow="2xl" display="block" w="100%" h="100%" objectFit="cover" />

//         <Box position="absolute" top="0" left="0" w="100%" h="100%">
//           <Box m="auto" pt={10} w="4xl" h="2xl" mt={10} borderWidth="1px" borderRadius="3xl" bg="white" shadow="md">
//             <Stack spacing={5}>
//               <Center>
//                 <Flex>
//                   <Stack spacing={10} direction="row">
//                     <Image
//                       src={loginUser?.img}
//                       fallbackSrc="https://via.placeholder.com/150"
//                       alt="topPic"
//                       borderRadius="full"
//                       boxSize="200"
//                       shadow="dark-lg"
//                     />
//                     <Box pt={5}>
//                       <Stack spacing={14}>
//                         <Center>
//                           <Stack spacing={5}>
//                             <Center>
//                               <Flex>
//                                 <Icon mr={5} as={FcBusinessman} w={10} h={10} />
//                                 <Heading
//                                   fontFamily="Franklin Gothic Medium"
//                                   textShadow="1px 1px orange"
//                                   color="gray.600"
//                                   letterSpacing={5}
//                                   fontSize="3xl"
//                                 >
//                                   {loginUser?.username}
//                                 </Heading>
//                               </Flex>
//                             </Center>
//                             <Flex>
//                               <Stack direction="row">
//                                 <Badge fontSize="20" colorScheme="green">
//                                   <Icon mb={1.5} mr={1} as={FcElectricalSensor} w={5} h={5} />
//                                   {loginUser?.dive_cnt} dive
//                                 </Badge>
//                                 <Badge fontSize="20" colorScheme="red">
//                                   <Icon mb={1.5} mr={1} as={BsAwardFill} color="orange.300" w={5} h={5} />
//                                   {loginUser?.license}
//                                 </Badge>
//                               </Stack>
//                             </Flex>
//                           </Stack>
//                         </Center>
//                         <Flex>
//                           <Stack spacing={5} direction="row">
//                             <Button letterSpacing={3} rightIcon={<BsFillCaretDownFill />} colorScheme="blue" variant="solid">
//                               フォロー
//                             </Button>
//                             <Button letterSpacing={3} rightIcon={<BsFillCaretDownFill />} colorScheme="blue" variant="solid">
//                               フォロワー
//                             </Button>
//                           </Stack>
//                         </Flex>
//                       </Stack>
//                     </Box>
//                   </Stack>
//                 </Flex>
//               </Center>
//               <Center>
//                 <Divider m="auto" w="70%" borderColor="gray.300" />
//               </Center>
//               <Scrollbar style={{ width: 900, height: 350 }}>
//                 <Center>
//                   <Box w="70%">
//                     <Text letterSpacing={1} color="gray.500">
//                       自己紹介
//                     </Text>
//                     <Textarea isDisabled placeholder="No profile" value={loginUser?.profile} />
//                   </Box>
//                 </Center>
//                 <Center>
//                   <Divider m="auto" w="70%" borderColor="gray.300" />
//                 </Center>

//                 <Center>
//                   <Box w="70%" mt={5}>
//                     <Text color="gray.500">プロフィール</Text>
//                     <Table variant="" colorScheme="">
//                       <Tbody>
//                         <Tr borderBottom="1px solid" borderColor="gray.200">
//                           <Td color="gray.500">
//                             <Icon pb={1} as={FcReadingEbook} w={8} h={8} />
//                             名前
//                           </Td>
//                           <Td color="gray.500">{loginUser?.fullname}</Td>
//                         </Tr>
//                         <Tr borderBottom="1px solid" borderColor="gray.200">
//                           <Td color="gray.500">
//                             <Icon pb={1} as={FcReadingEbook} w={8} h={8} />
//                             年齢
//                           </Td>
//                           <Td color="gray.500">{loginUser?.old}</Td>
//                         </Tr>
//                         <Tr borderBottom="1px solid" borderColor="gray.200">
//                           <Td color="gray.500">
//                             <Icon pb={1} as={FcReadingEbook} w={8} h={8} />
//                             居住地
//                           </Td>
//                           <Td color="gray.500">{loginUser?.fromAddress}</Td>
//                         </Tr>
//                         <Tr borderBottom="1px solid" borderColor="gray.200">
//                           <Td color="gray.500">
//                             <Icon pb={1} as={FcReadingEbook} w={8} h={8} />
//                             ダイビング歴
//                           </Td>
//                           <Td color="gray.500">{loginUser?.diving_history}</Td>
//                         </Tr>
//                         <Tr borderBottom="1px solid" borderColor="gray.200">
//                           <Td color="gray.500">
//                             <Icon pb={1} as={FcReadingEbook} w={8} h={8} />
//                             好きなダイビングスポット
//                           </Td>
//                           <Td color="gray.500">{loginUser?.like_diving_spots}</Td>
//                         </Tr>
//                         <Tr borderBottom="1px solid" borderColor="gray.200">
//                           <Td color="gray.500">
//                             <Icon pb={1} as={FcReadingEbook} w={8} h={8} />
//                             好きな魚
//                           </Td>
//                           <Td color="gray.500">{loginUser?.like_fish}</Td>
//                         </Tr>
//                       </Tbody>
//                     </Table>
//                     <Button letterSpacing={5} mt={5} w="100%" colorScheme="blue" variant="solid" onClick={onClickMyLogInfo}>
//                       過去ログを見る
//                     </Button>
//                   </Box>
//                 </Center>
//               </Scrollbar>
//             </Stack>
//           </Box>
//         </Box>
//       </Box>
//     </>
//   );
// });
