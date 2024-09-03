/* eslint-disable */
import { memo, VFC, useState, ChangeEvent, useCallback, HTMLInputTypeAttribute, useRef, RefObject } from "react"
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
import ReactCrop from 'react-image-crop';
import ReactImageBase64 from 'react-image-base64';
import companyIcon from "../../image/summer-6877.gif";

import { loginUserState } from "../../provider/LoginUserProvider";
import { useRecoilValue } from "recoil";
import axiosInstance from "../../api/axiosInstance";
import { motion } from 'framer-motion';

// `motion` でラップすることで、アニメーションを適用できます
const AnimatedBox = motion(Box);

export const LogAdd: VFC = memo(() => {

    //画像関係
    const [images, setImages] = useState({ data: [] });
    const [errors, setErrors] = useState([]);


    //ログインアカウントを取得
    const loginUser = useRecoilValue(loginUserState);

    //トーストを表示する
    const { showMessage } = useMessage();

    //ダイアログ設定
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef(null)

    //State
    const [num_of_dives, setNum_of_dives] = useState(0);
    const [dive_date, setDive_date] = useState("");
    const [dive_spots, setDive_spots] = useState("");
    const [dive_style, setDive_style] = useState("ビーチ");
    const [purpose, setPurpose] = useState("");
    const [dive_point_name, setDive_point_name] = useState("");
    const [dive_start_time, setDive_start_time] = useState("");
    const [dive_end_time, setDive_end_time] = useState("");
    const [dive_time, setDive_time] = useState(0);
    const [maxi_depth, setMaxi_depth] = useState(0);
    const [age_depth, setAge_depth] = useState(0);
    const [tank_start_pressure, setTank_start_pressure] = useState(0);
    const [tank_end_pressure, setTank_end_pressure] = useState(0);
    const [water_temp_surface, setWater_temp_surface] = useState("");
    const [water_temp_bottom, setWater_temp_bottom] = useState("");
    const [weather, setWeather] = useState("1");
    const [wind, setWind] = useState("");
    const [sea_level, setSea_level] = useState("0");
    const [around_the_tide, setAround_the_tide] = useState("1");
    const [high_tide, setHigh_tide] = useState("");
    const [low_tide, setLow_tide] = useState("");
    const [suit, setSuit] = useState("1");
    const [suit_thickness, setSuit_thickness] = useState("1");
    const [water_transparency, setWater_transparency] = useState("");
    const [mood, setMood] = useState("1");
    const [weight, setWeight] = useState(0);
    const [uncle, setUncle] = useState("");
    const [tank_type, setTank_type] = useState("1");
    const [tank_liter, setTank_liter] = useState("");
    const [remarks, setRemarks] = useState("");
    const [buddy_sign, setBuddy_sign] = useState("");
    const [instructor_sign, setInstructor_sign] = useState("");
    const [img, setImg] = useState("");
    const [imgSize, setImgSize] = useState(0);

    //OnChangeイベント設定
    const onChangeNum_of_dives = (e: ChangeEvent<HTMLInputElement>) => setNum_of_dives(Number(e.target.value));
    const onChangeDive_date = (e: ChangeEvent<HTMLInputElement>) => setDive_date(e.target.value)
    const onChangeDive_spots = (e: ChangeEvent<HTMLInputElement>) => setDive_spots(e.target.value)
    const onChangeDive_style = (e: ChangeEvent<HTMLInputElement>) => setDive_style(e.target.value)
    const onChangePurpose = (e: ChangeEvent<HTMLInputElement>) => setPurpose(e.target.value)
    const onChangeDive_point_name = (e: ChangeEvent<HTMLInputElement>) => setDive_point_name(e.target.value)
    const onChangeDive_start_time = (e: ChangeEvent<HTMLInputElement>) => setDive_start_time(e.target.value)
    const onChangeDive_end_time = (e: ChangeEvent<HTMLInputElement>) => setDive_end_time(e.target.value)
    const onChangeDive_time = (e: ChangeEvent<HTMLInputElement>) => setDive_time(Number(e.target.value))
    const onChangeMaxi_depth = (e: ChangeEvent<HTMLInputElement>) => setMaxi_depth(Number(e.target.value))
    const onChangeAge_depth = (e: ChangeEvent<HTMLInputElement>) => setAge_depth(Number(e.target.value))
    const onChangeTank_start_pressure = (e: ChangeEvent<HTMLInputElement>) => setTank_start_pressure(Number(e.target.value))
    const onChangeTank_end_pressure = (e: ChangeEvent<HTMLInputElement>) => setTank_end_pressure(Number(e.target.value))
    const onChangeWater_temp_surface = (e: ChangeEvent<HTMLInputElement>) => setWater_temp_surface(e.target.value)
    const onChangeWater_temp_bottom = (e: ChangeEvent<HTMLInputElement>) => setWater_temp_bottom(e.target.value)
    const onChangeWeather = (e: ChangeEvent<HTMLInputElement>) => setWeather(e.target.value)
    const onChangeWind = (e: ChangeEvent<HTMLInputElement>) => setWind(e.target.value)
    const onChangeSea_level = (e: ChangeEvent<HTMLSelectElement>) => setSea_level(e.target.value)
    const onChangeAround_the_tide = (e: ChangeEvent<HTMLInputElement>) => setAround_the_tide(e.target.value)
    const onChangeHigh_tide = (e: ChangeEvent<HTMLInputElement>) => setHigh_tide(e.target.value)
    const onChangeLow_tide = (e: ChangeEvent<HTMLInputElement>) => setLow_tide(e.target.value)
    const onChangeSuit = (e: ChangeEvent<HTMLInputElement>) => setSuit(e.target.value)
    const onChangeSuit_thickness = (e: ChangeEvent<HTMLInputElement>) => setSuit_thickness(e.target.value)
    const onChangeWater_transparency = (e: ChangeEvent<HTMLInputElement>) => setWater_transparency(e.target.value)
    const onChangeMood = (e: ChangeEvent<HTMLInputElement>) => setMood(e.target.value)
    const onChangeWeight = (e: ChangeEvent<HTMLInputElement>) => setWeight(Number(e.target.value))
    const onChangeUncle = (e: ChangeEvent<HTMLInputElement>) => setUncle(e.target.value)
    const onChangeTank_type = (e: ChangeEvent<HTMLInputElement>) => setTank_type(e.target.value)
    const onChangeTank_liter = (e: ChangeEvent<HTMLInputElement>) => setTank_liter(e.target.value)
    const onChangeRemarks = (e: ChangeEvent<HTMLTextAreaElement>) => setRemarks(e.target.value)
    const onChangeBuddy_sign = (e: ChangeEvent<HTMLInputElement>) => setBuddy_sign(e.target.value)
    const onChangeInstructor_sign = (e: ChangeEvent<HTMLInputElement>) => setInstructor_sign(e.target.value)

    // ログを登録する
    const logAdd = useCallback(() => {
        // ダイアログを閉じる
        onClose();

        // 登録処理
        axiosInstance.post("/logAdd", {
            num_of_dives: num_of_dives,
            dive_date: dive_date,
            dive_spots: dive_spots,
            dive_style: dive_style,
            purpose: purpose,
            dive_point_name: dive_point_name,
            dive_start_time: dive_start_time,
            dive_end_time: dive_end_time,
            dive_time: dive_time,
            maxi_depth: maxi_depth,
            age_depth: age_depth,
            tank_start_pressure: tank_start_pressure,
            tank_end_pressure: tank_end_pressure,
            water_temp_surface: water_temp_surface,
            water_temp_bottom: water_temp_bottom,
            weather: weather,
            wind: wind,
            sea_level: sea_level,
            around_the_tide: around_the_tide,
            high_tide: high_tide,
            low_tide: low_tide,
            suit: suit,
            suit_thickness: suit_thickness,
            water_transparency: water_transparency,
            mood: mood,
            weight: weight,
            uncle: uncle,
            tank_type: tank_type,
            tank_liter: tank_liter,
            remarks: remarks,
            buddy_sign: buddy_sign,
            instructor_sign: instructor_sign,
            img: img,
            user_id: loginUser?.id
        })
            .then(() => {
                // 成功メッセージ
                showMessage({ title: "ログを登録しました", status: "success" });
            })
            .catch((error) => {
                // エラーハンドリング
                console.error("ログ登録エラー:", error);
                showMessage({ title: "ログの登録に失敗しました", status: "error" });
            });
    }, [
        num_of_dives, dive_date, dive_spots, dive_style, purpose, dive_point_name,
        dive_start_time, dive_end_time, dive_time, maxi_depth, age_depth,
        tank_start_pressure, tank_end_pressure, water_temp_surface, water_temp_bottom,
        weather, wind, sea_level, around_the_tide, high_tide, low_tide, suit,
        suit_thickness, water_transparency, mood, weight, uncle, tank_type,
        tank_liter, remarks, buddy_sign, instructor_sign, img, loginUser?.id,
        onClose, showMessage
    ]);

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
                    <Center><Heading letterSpacing={5} color="orange.500" as="h1" mb={5}>ログ登録</Heading></Center>
                    <Divider m="auto" w="70%" borderColor="orange.200" />
                    <Box flex="1" overflow="hidden">
                        <Scrollbar style={{ width: '100%', height: '100%' }}>
                            <Stack m="auto" spacing={12} py={4} px={20} mt={5}>
                                <Flex>
                                    <Text color="red.600">＊</Text><Text mr={5} color="gray.500">通算潜水回数 :</Text>
                                    <Input variant="flushed" placeholder="" size="xl" w="10%" isInvalid={num_of_dives === 0 || !Number.isInteger(num_of_dives)} errorBorderColor="red.300" onChange={onChangeNum_of_dives} />
                                    <Spacer />
                                    <Text color="red.600">＊</Text><Text mr={5} color="gray.500">潜水日 :</Text>
                                    <Input type="date" variant="flushed" placeholder="" size="xl" w="30%" isInvalid={dive_date === ""} errorBorderColor="red.300" onChange={onChangeDive_date} />
                                </Flex>
                                <Flex>
                                    <Text color="red.600">＊</Text><Text mr={5} color="gray.500">潜水地 :</Text>
                                    <Input variant="flushed" placeholder="" size="xl" w="40%" isInvalid={dive_spots === ""} errorBorderColor="red.300" onChange={onChangeDive_spots} />
                                    <Spacer />
                                    <Flex borderBottom="solid" borderBottomColor="gray.200">
                                        <Text mr={5} color="gray.500">スタイル :</Text>
                                        <RadioGroup color="gray.500" defaultValue="ビーチ" >
                                            <Stack spacing={10} direction="row">
                                                <Radio colorScheme="red" value="ビーチ" onChange={onChangeDive_style}>ビーチ</Radio>
                                                <Radio colorScheme="green" value="ボート" onChange={onChangeDive_style}>ボート</Radio>
                                            </Stack>
                                        </RadioGroup>
                                    </Flex>
                                </Flex>
                                <Flex>
                                    <Text mr={5} color="gray.500">目的 :</Text>
                                    <Input variant="flushed" placeholder="" size="xl" w="30%" onChange={onChangePurpose} />
                                    <Spacer />
                                    <Text mr={5} color="gray.500">ポイント名 :</Text>
                                    <Input variant="flushed" placeholder="" size="xl" w="30%" onChange={onChangeDive_point_name} />
                                </Flex>
                                <Flex>
                                    <Text color="red.600">＊</Text><Text mr={5} color="gray.500">潜水開始時間 :</Text>
                                    <Input type="time" mr="5" variant="flushed" placeholder="" size="xl" w="11%" isInvalid={dive_start_time === ""} errorBorderColor="red.300" onChange={onChangeDive_start_time} />
                                    <Text color="gray.500"> ➡ </Text>
                                    <Text ml="5" color="red.600">＊</Text><Text mr={5} color="gray.500">潜水終了時間 :</Text>
                                    <Input type="time" variant="flushed" placeholder="" size="xl" w="11%" isInvalid={dive_end_time === ""} errorBorderColor="red.300" onChange={onChangeDive_end_time} />
                                    <Spacer />
                                    <Text color="red.600">＊</Text><Text color="gray.500">潜水時間 :</Text>
                                    <Input variant="flushed" placeholder="" size="xl" w="3%" isInvalid={dive_time === 0 || !Number.isInteger(dive_time)} errorBorderColor="red.300" onChange={onChangeDive_time} />
                                    <Text color="gray.500">min</Text>
                                </Flex>
                                <Flex>
                                    <Stack spacing={5} direction="row">
                                        <Center w="20%">
                                            <Text color="gray.500">水深</Text>
                                        </Center>
                                        <Box>
                                            <Flex mt={{ base: 4, md: 3 }}>
                                                <Text color="red.600">＊</Text><Text color="gray.500" mr="5">最大 : </Text>
                                                <Input variant="flushed" placeholder="" size="xl" w="20%" isInvalid={maxi_depth === 0 || !Number.isInteger(maxi_depth)} errorBorderColor="red.300" onChange={onChangeMaxi_depth} /><Text color="gray.500">m</Text>
                                            </Flex>
                                            <Flex mt={{ base: 4, md: 3 }}>
                                                <Text color="red.600">＊</Text><Text color="gray.500" mr="5">平均 : </Text>
                                                <Input variant="flushed" placeholder="" size="xl" w="20%" isInvalid={age_depth === 0 || !Number.isInteger(age_depth)} errorBorderColor="red.300" onChange={onChangeAge_depth} /><Text color="gray.500">m</Text>
                                            </Flex>
                                        </Box>

                                        <Center w="30%">
                                            <Text color="gray.500">タンク圧力</Text>
                                        </Center>
                                        <Box>
                                            <Flex mt={{ base: 4, md: 3 }}>
                                                <Text color="red.600">＊</Text><Text color="gray.500" mr="5">開始 : </Text>
                                                <Input variant="flushed" placeholder="" size="xl" w="20%" isInvalid={tank_start_pressure === 0 || !Number.isInteger(tank_start_pressure)} errorBorderColor="red.300" onChange={onChangeTank_start_pressure} /><Text color="gray.500">kg</Text>
                                            </Flex>
                                            <Flex mt={{ base: 4, md: 3 }}>
                                                <Text color="red.600">＊</Text><Text color="gray.500" mr="5">終了 : </Text>
                                                <Input variant="flushed" placeholder="" size="xl" w="20%" isInvalid={tank_end_pressure === 0 || !Number.isInteger(tank_end_pressure)} errorBorderColor="red.300" onChange={onChangeTank_end_pressure} /><Text color="gray.500">kg</Text>
                                            </Flex>
                                        </Box>
                                    </Stack>
                                </Flex>
                                <Flex>
                                    <Text mr={5} color="gray.500">水温 (水面) :</Text>
                                    <Input variant="flushed" placeholder="" size="xl" w="10%" onChange={onChangeWater_temp_surface} /><Text mr={20} color="gray.500">℃</Text>
                                    <Text mr={5} color="gray.500">水温 (水底) :</Text>
                                    <Input variant="flushed" placeholder="" size="xl" w="10%" onChange={onChangeWater_temp_bottom} /><Text color="gray.500">℃</Text>
                                </Flex>
                                <Flex>
                                    <Text mr={10} color="gray.500">天気 :</Text>
                                    <RadioGroup color="gray.500" defaultValue="1">
                                        <Stack spacing={5} direction="row">
                                            <Radio colorScheme="orange" value="1" onChange={onChangeWeather}><Icon as={BsFillSunFill} color="orange.300" w={8} h={8} /></Radio>
                                            <Radio colorScheme="gray" value="2" onChange={onChangeWeather}><Icon as={BsFillCloudFill} color="gray.400" w={8} h={8} /></Radio>
                                            <Radio colorScheme="blue" value="3" onChange={onChangeWeather}><Icon as={BsFillCloudRainFill} color="blue.400" w={8} h={8} /></Radio>
                                            <Radio colorScheme="yellow" value="4" onChange={onChangeWeather}><Icon as={BsCloudSnow} color="gray.400" w={8} h={8} /></Radio>
                                        </Stack>
                                    </RadioGroup>
                                </Flex>
                                <Flex>
                                    <Text mr={5} color="gray.500">風向き :</Text>
                                    <Input variant="flushed" placeholder="" size="xl" w="30%" mr={20} onChange={onChangeWind} />
                                    <Flex h="5">
                                        <Text mr={5} color="gray.500">海況レベル :</Text>
                                        <Select w="100" h="7" color="gray.500" variant="flushed" onChange={onChangeSea_level}>
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </Select>
                                    </Flex>
                                </Flex>
                                <Flex>
                                    <Stack spacing={5} direction="row">
                                        <Center>
                                            <Text color="gray.500">潮回り : </Text>
                                        </Center>
                                        <RadioGroup color="gray.500" defaultValue="2">
                                            <Stack spacing={5} direction="row" >
                                                <Radio colorScheme="orange" value="1" onChange={onChangeAround_the_tide}>大潮</Radio>
                                                <Radio colorScheme="orange" value="2" onChange={onChangeAround_the_tide}>中潮</Radio>
                                                <Radio colorScheme="orange" value="3" onChange={onChangeAround_the_tide}>小潮</Radio>
                                                <Radio colorScheme="orange" value="4" onChange={onChangeAround_the_tide}>長潮</Radio>
                                                <Radio colorScheme="orange" value="5" onChange={onChangeAround_the_tide}>若潮</Radio>
                                            </Stack>
                                        </RadioGroup>
                                    </Stack>
                                </Flex>
                                <Flex>
                                    <Text mr={5} color="gray.500">満潮 :</Text>
                                    <Input type="time" mr="5" variant="flushed" placeholder="" size="xl" w="11%" onChange={onChangeHigh_tide} />
                                    <Text ml="20" mr={5} color="gray.500">干潮 :</Text>
                                    <Input type="time" variant="flushed" placeholder="" size="xl" w="11%" onChange={onChangeLow_tide} />
                                </Flex>
                                <Flex>
                                    <Stack w="100%" direction="row">
                                        <Center>
                                            <Text color="gray.500">スーツ</Text>
                                        </Center>
                                        <Center w="20%">
                                            <RadioGroup color="gray.500" defaultValue="2">
                                                <Stack spacing={10}>
                                                    <Radio colorScheme="orange" value="1" onChange={onChangeSuit}>ウェット</Radio>
                                                    <Radio colorScheme="orange" value="2" onChange={onChangeSuit}>ドライ</Radio>
                                                </Stack>
                                            </RadioGroup>
                                        </Center>
                                        <Center>
                                            <RadioGroup color="gray.500" defaultValue="2">
                                                <Stack>
                                                    <Radio colorScheme="orange" value="1" onChange={onChangeSuit_thickness}>3mm</Radio>
                                                    <Radio colorScheme="orange" value="2" onChange={onChangeSuit_thickness}>3.5mm</Radio>
                                                    <Radio colorScheme="orange" value="3" onChange={onChangeSuit_thickness}>5mm</Radio>
                                                    <Radio colorScheme="orange" value="4" onChange={onChangeSuit_thickness}>6.5mm</Radio>
                                                </Stack>
                                            </RadioGroup>
                                        </Center>
                                        <Center w="60%">
                                            <Stack spacing={8} ml="170">
                                                <Flex>
                                                    <Text mr={5} color="gray.500">透明度 : </Text>
                                                    <Input variant="flushed" placeholder="" size="xl" w="50%" onChange={onChangeWater_transparency} /><Text color="gray.500">m</Text>
                                                </Flex>
                                                <Flex>
                                                    <Text mr={5} color="gray.500">気分 : </Text>
                                                    <RadioGroup color="gray.500" defaultValue="2" >
                                                        <Stack>
                                                            <Stack spacing={5} direction="row">
                                                                <Radio colorScheme="orange" value="1" onChange={onChangeMood}><Icon as={BsEmojiLaughing} color="orange.500" w={8} h={8} /></Radio>
                                                                <Radio colorScheme="orange" value="2" onChange={onChangeMood}><Icon as={BsEmojiExpressionless} color="blue.500" w={8} h={8} /></Radio>
                                                            </Stack>
                                                            <Stack spacing={5} direction="row">
                                                                <Radio colorScheme="orange" value="3" onChange={onChangeMood}><Icon as={BsEmojiAngry} color="red.600" w={8} h={8} /></Radio>
                                                                <Radio colorScheme="orange" value="4" onChange={onChangeMood}><Icon as={BsEmojiDizzy} color="purple.500" w={8} h={8} /></Radio>
                                                            </Stack>
                                                        </Stack>
                                                    </RadioGroup>
                                                </Flex>
                                            </Stack>
                                        </Center>
                                    </Stack>
                                </Flex>
                                <Flex>
                                    <Box w="40%">
                                        <Stack spacing={10}>
                                            <Flex>
                                                <Text color="red.600">＊</Text><Text mr={5} color="gray.500">ウエイト :</Text>
                                                <Input variant="flushed" placeholder="" size="xl" w="30%" isInvalid={weight === 0 || !Number.isInteger(weight)} errorBorderColor="red.300" onChange={onChangeWeight} /><Text color="gray.500">kg</Text>
                                            </Flex>
                                            <Flex>
                                                <Text mr={5} color="gray.500">アンクル :</Text>
                                                <Input variant="flushed" placeholder="" size="xl" w="30%" onChange={onChangeUncle} /><Text color="gray.500">kg</Text>
                                            </Flex>
                                        </Stack>
                                    </Box>
                                    <Flex w="80%">
                                        <Box>
                                            <Text mr={5} color="gray.500">タンク :</Text>
                                        </Box>
                                        <RadioGroup color="gray.500" defaultValue="2">
                                            <Stack>
                                                <Radio colorScheme="orange" value="1" onChange={onChangeTank_type}>スチール</Radio>
                                                <Radio colorScheme="orange" value="2" onChange={onChangeTank_type}>アルミ</Radio>
                                                <Radio colorScheme="orange" value="3" onChange={onChangeTank_type}>ナイトロックス</Radio>
                                            </Stack>
                                        </RadioGroup>
                                        <Center>
                                            <Input variant="flushed" placeholder="" size="xl" w="30%" onChange={onChangeTank_liter} /><Text color="gray.500">㍑</Text>
                                        </Center>
                                    </Flex>
                                </Flex>
                                <Flex>
                                    <Textarea placeholder="備 考" onChange={onChangeRemarks} />
                                </Flex>
                                <Box>
                                    <Stack spacing={5}>
                                        <Flex>
                                            <Text mr={5} color="gray.500">バディーサイン :</Text>
                                            <Input variant="flushed" placeholder="" size="xl" w="70%" onChange={onChangeBuddy_sign} />
                                        </Flex>
                                        <Flex>
                                            <Text color="red.600">＊</Text><Text mr={5} color="gray.500">インストラクターサイン :</Text>
                                            <Input variant="flushed" placeholder="" size="xl" w="60%" isInvalid={instructor_sign === ""} errorBorderColor="red.300" onChange={onChangeInstructor_sign} />
                                        </Flex>
                                    </Stack>
                                </Box>
                            </Stack>
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
                        </Scrollbar>
                    </Box>
                    <Flex justify="right">
                        <Button mr="20" bg="orange.400" colorScheme="orange" size="md" isDisabled={
                            (num_of_dives === 0 || !Number.isInteger(num_of_dives)) ||
                            (dive_date === "") ||
                            (dive_spots === "") ||
                            (dive_start_time === "") ||
                            (dive_end_time === "") ||
                            (dive_time === 0 || !Number.isInteger(dive_time)) ||
                            (maxi_depth === 0 || !Number.isInteger(maxi_depth)) ||
                            (age_depth === 0 || !Number.isInteger(age_depth)) ||
                            (tank_start_pressure === 0 || !Number.isInteger(tank_start_pressure)) ||
                            (tank_end_pressure === 0 || !Number.isInteger(tank_end_pressure)) ||
                            (weight === 0 || !Number.isInteger(weight)) ||
                            (instructor_sign === "")
                        } onClick={onOpen}>登　録</Button>
                    </Flex>
                    <Flex mr="20" justify="right">
                        <Text color="red.500">必須項目 * は全て入力してください</Text>
                    </Flex>




                </AnimatedBox>
            </Box>


            {/* 登録ダイアログ */}
            <AlertDialog motionPreset="slideInBottom" leastDestructiveRef={cancelRef} onClose={onClose} isOpen={isOpen} isCentered>
                <AlertDialogOverlay />
                <AlertDialogContent bg="white">
                    <AlertDialogHeader>ログを登録しますか?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        ログを登録する場合は「はい」登録しない場合は「いいえ」を選択してください。
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button bg="orange.500" colorScheme="orange" color="white" onClick={logAdd}>
                            はい
                        </Button>
                        <Button bg="orange.500" colorScheme="orange" color="white" ml={3} ref={cancelRef} onClick={onClose}>
                            いいえ
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </>
    );
});

