import {memo,VFC,useCallback,useEffect,useState,ChangeEvent} from "react"
import {Box,Table,Tr,Td,Tbody,Thead,Th,Center,Image,Heading,Stack,HStack,Text,Divider,Flex
,Modal,ModalContent,ModalOverlay,useDisclosure,ModalHeader,ModalCloseButton,ModalBody,FormControl,ModalFooter,FormLabel,Input} from "@chakra-ui/react"
import {InputGroup,InputLeftAddon,Spacer,RadioGroup,Radio,Square,Icon,Select,Textarea,Button,} from "@chakra-ui/react"
import {FcManager } from "react-icons/fc";
import {BsFillSunFill,BsFillCloudRainFill,BsFillCloudFill,BsCloudSnow,BsEmojiLaughing,BsEmojiAngry,BsEmojiExpressionless,BsEmojiDizzy} from "react-icons/bs";
import styled from "styled-components"
import { Scrollbar } from "react-scrollbars-custom";
import { LogInfo } from "../../types/api/logInfo";
import axiosInstance from "../../api/axiosInstance";
import {useMessage} from "../../hooks/useMessage";
import { useHistory } from "react-router-dom";

type Props = {
    isOpen:boolean;
    onClose:()=>void;
    selectedLogInfo:LogInfo | null
    isEditMode:boolean;
}

export const LogInfoModal:VFC<Props> = memo((props) => {

    const {isOpen,onClose,selectedLogInfo,isEditMode} = props

    const history = useHistory();

    //トーストを表示する
    const {showMessage} = useMessage();

    //State
    const [num_of_dives, setNum_of_dives] = useState(0);
    const [dive_date,setDive_date] = useState("");
    const [dive_spots,setDive_spots] = useState("");
    const [dive_style,setDive_style] = useState("ビーチ");
    const [purpose,setPurpose] = useState("");
    const [dive_point_name,setDive_point_name] = useState("");
    const [dive_start_time,setDive_start_time] = useState("");
    const [dive_end_time,setDive_end_time] = useState("");
    const [dive_time,setDive_time] = useState(0);
    const [maxi_depth,setMaxi_depth] = useState(0);
    const [age_depth,setAge_depth] = useState(0);
    const [tank_start_pressure,setTank_start_pressure] = useState(0);
    const [tank_end_pressure,setTank_end_pressure] = useState(0);
    const [water_temp_surface,setWater_temp_surface] = useState("");
    const [water_temp_bottom,setWater_temp_bottom] = useState("");
    const [weather,setWeather] = useState("1");
    const [wind,setWind] = useState("");
    const [sea_level,setSea_level] = useState("0");
    const [around_the_tide,setAround_the_tide] = useState("1");
    const [high_tide,setHigh_tide] = useState("");
    const [low_tide,setLow_tide] = useState("");
    const [suit,setSuit] = useState("1");
    const [suit_thickness,setSuit_thickness] = useState("1");
    const [water_transparency,setWater_transparency] = useState("");
    const [mood,setMood] = useState("1");
    const [weight,setWeight] = useState(0);
    const [uncle,setUncle] = useState("");
    const [tank_type,setTank_type] = useState("1");
    const [tank_liter,setTank_liter] = useState("");
    const [remarks,setRemarks] = useState("");
    const [buddy_sign,setBuddy_sign] = useState("");
    const [instructor_sign,setInstructor_sign] = useState("");
    const [img,setImg] = useState("");
    const [imgSize,setImgSize] = useState(0);

    //OnChangeイベント設定
    const onChangeNum_of_dives = (e:ChangeEvent<HTMLInputElement>) => setNum_of_dives(Number(e.target.value));
    const onChangeDive_date = (e:ChangeEvent<HTMLInputElement>) => setDive_date(e.target.value)
    const onChangeDive_spots = (e:ChangeEvent<HTMLInputElement>) => setDive_spots(e.target.value)
    const onChangeDive_style = (e:ChangeEvent<HTMLInputElement>) => setDive_style(e.target.value)
    const onChangePurpose = (e:ChangeEvent<HTMLInputElement>) => setPurpose(e.target.value)
    const onChangeDive_point_name = (e:ChangeEvent<HTMLInputElement>) => setDive_point_name(e.target.value)
    const onChangeDive_start_time = (e:ChangeEvent<HTMLInputElement>) => setDive_start_time(e.target.value)
    const onChangeDive_end_time = (e:ChangeEvent<HTMLInputElement>) => setDive_end_time(e.target.value)
    const onChangeDive_time = (e:ChangeEvent<HTMLInputElement>) => setDive_time(Number(e.target.value))
    const onChangeMaxi_depth = (e:ChangeEvent<HTMLInputElement>) => setMaxi_depth(Number(e.target.value))
    const onChangeAge_depth = (e:ChangeEvent<HTMLInputElement>) => setAge_depth(Number(e.target.value))
    const onChangeTank_start_pressure = (e:ChangeEvent<HTMLInputElement>) => setTank_start_pressure(Number(e.target.value))
    const onChangeTank_end_pressure = (e:ChangeEvent<HTMLInputElement>) => setTank_end_pressure(Number(e.target.value))
    const onChangeWater_temp_surface = (e:ChangeEvent<HTMLInputElement>) => setWater_temp_surface(e.target.value)
    const onChangeWater_temp_bottom = (e:ChangeEvent<HTMLInputElement>) => setWater_temp_bottom(e.target.value)
    const onChangeWeather = (e:ChangeEvent<HTMLInputElement>) => setWeather(e.target.value)
    const onChangeWind = (e:ChangeEvent<HTMLInputElement>) => setWind(e.target.value)
    const onChangeSea_level = (e:ChangeEvent<HTMLSelectElement>) => setSea_level(e.target.value)
    const onChangeAround_the_tide = (e:ChangeEvent<HTMLInputElement>) => setAround_the_tide(e.target.value)
    const onChangeHigh_tide = (e:ChangeEvent<HTMLInputElement>) => setHigh_tide(e.target.value)
    const onChangeLow_tide = (e:ChangeEvent<HTMLInputElement>) => setLow_tide(e.target.value)
    const onChangeSuit = (e:ChangeEvent<HTMLInputElement>) => setSuit(e.target.value)
    const onChangeSuit_thickness = (e:ChangeEvent<HTMLInputElement>) => setSuit_thickness(e.target.value)
    const onChangeWater_transparency = (e:ChangeEvent<HTMLInputElement>) => setWater_transparency(e.target.value)
    const onChangeMood = (e:ChangeEvent<HTMLInputElement>) => setMood(e.target.value)
    const onChangeWeight = (e:ChangeEvent<HTMLInputElement>) => setWeight(Number(e.target.value))
    const onChangeUncle = (e:ChangeEvent<HTMLInputElement>) => setUncle(e.target.value)
    const onChangeTank_type = (e:ChangeEvent<HTMLInputElement>) => setTank_type(e.target.value)
    const onChangeTank_liter = (e:ChangeEvent<HTMLInputElement>) => setTank_liter(e.target.value)
    const onChangeRemarks = (e:ChangeEvent<HTMLTextAreaElement>) => setRemarks(e.target.value)
    const onChangeBuddy_sign = (e:ChangeEvent<HTMLInputElement>) => setBuddy_sign(e.target.value)
    const onChangeInstructor_sign = (e:ChangeEvent<HTMLInputElement>) => setInstructor_sign(e.target.value)

    useEffect(() => {
        if (selectedLogInfo) {
            setNum_of_dives(selectedLogInfo.num_of_dives);
            setDive_date(selectedLogInfo.dive_date);
            setDive_spots(selectedLogInfo.dive_spots);
            setDive_style(selectedLogInfo.dive_style);
            setPurpose(selectedLogInfo.purpose);
            setDive_point_name(selectedLogInfo.dive_point_name);
            setDive_start_time(selectedLogInfo.dive_start_time);
            setDive_end_time(selectedLogInfo.dive_end_time);
            setDive_time(selectedLogInfo.dive_time);
            setMaxi_depth(selectedLogInfo.maxi_depth);
            setAge_depth(selectedLogInfo.age_depth);
            setTank_start_pressure(selectedLogInfo.tank_start_pressure);
            setTank_end_pressure(selectedLogInfo.tank_end_pressure);
            setWater_temp_surface(selectedLogInfo.water_temp_surface);
            setWater_temp_bottom(selectedLogInfo.water_temp_bottom);
            setWeather(selectedLogInfo.weather);
            setWind(selectedLogInfo.wind);
            setSea_level(selectedLogInfo.sea_level);
            setAround_the_tide(selectedLogInfo.around_the_tide);
            setHigh_tide(selectedLogInfo.high_tide);
            setLow_tide(selectedLogInfo.low_tide);
            setSuit(selectedLogInfo.suit);
            setSuit_thickness(selectedLogInfo.suit_thickness);
            setWater_transparency(selectedLogInfo.water_transparency);
            setMood(selectedLogInfo.mood);
            setWeight(selectedLogInfo.weight);
            setUncle(selectedLogInfo.uncle);
            setTank_type(selectedLogInfo.tank_type);
            setTank_liter(selectedLogInfo.tank_liter);
            setRemarks(selectedLogInfo.remarks);
            setBuddy_sign(selectedLogInfo.buddy_sign);
            setInstructor_sign(selectedLogInfo.instructor_sign);
            setImg(selectedLogInfo.img);
        }
    }, [selectedLogInfo]);



// ログを更新する
const logUpdate = useCallback(() => {
    axiosInstance.post("/logUpdate", {
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
        user_id: selectedLogInfo.user_id,
        log_id: selectedLogInfo.log_id
    })
    .then(() => {
        // 成功メッセージ
        history.push("/profile/mylog");
        showMessage({ title: "ログを更新しました", status: "success" });
        onClose();
    })
    .catch((error) => {
        // エラーハンドリング
        console.error("ログ更新エラー:", error);
        showMessage({ title: "ログの更新に失敗しました", status: "error" });
    });
}, [
    num_of_dives, dive_date, dive_spots, dive_style, purpose, dive_point_name, 
    dive_start_time, dive_end_time, dive_time, maxi_depth, age_depth, 
    tank_start_pressure, tank_end_pressure, water_temp_surface, water_temp_bottom, 
    weather, wind, sea_level, around_the_tide, high_tide, low_tide, suit, 
    suit_thickness, water_transparency, mood, weight, uncle, tank_type, 
    tank_liter, remarks, buddy_sign, instructor_sign, img, 
    selectedLogInfo?.user_id, selectedLogInfo?.log_id
]);

    return(
        <>
            {/* ダイアログ */}
            <Modal size="5xl" isOpen={isOpen} onClose={onClose} autoFocus={false} motionPreset="slideInBottom">
              <ModalOverlay/>
              <ModalContent bg="white" pb={2}>
                <ModalHeader>ログ</ModalHeader>
                <ModalCloseButton></ModalCloseButton>
                <ModalBody mx={4}>
                <Scrollbar style={{ width: 950, height: 600 }}>
                <Stack m="auto" spacing={12} py={4} px={20} mt={5}>
                    <Flex>
                        <Text  mr={5} color="gray.500">通算潜水回数 :</Text>
                        <Input isReadOnly={isEditMode} variant="flushed" placeholder="" size="xl" w="10%" value={num_of_dives} onChange={onChangeNum_of_dives}/>
                        <Spacer/>
                        <Text mr={5} color="gray.500">潜水日 :</Text>
                        <Input isReadOnly={isEditMode} type="date" variant="flushed" placeholder="" size="xl" w="30%" value={dive_date} onChange={onChangeDive_date}/>
                    </Flex>
                    <Flex>
                        <Text mr={5} color="gray.500">潜水地 :</Text>
                        <Input isReadOnly={isEditMode} variant="flushed" placeholder="" size="xl" w="40%" value={dive_spots} onChange={onChangeDive_spots}/>
                        <Spacer/>
                        <Flex borderBottom="solid" borderBottomColor="gray.200">
                        <Text  mr={5} color="gray.500">スタイル :</Text>
                        <RadioGroup color="gray.500" value={dive_style}>
                            <Stack spacing={10} direction="row">
                                <Radio isReadOnly={isEditMode} colorScheme="red" value="ビーチ" onChange={onChangeDive_style}>ビーチ</Radio>
                                <Radio isReadOnly={isEditMode} colorScheme="green" value="ボート" onChange={onChangeDive_style}>ボート</Radio>
                            </Stack>
                        </RadioGroup>
                        </Flex>
                    </Flex>
                    <Flex>
                        <Text  mr={5} color="gray.500">目的 :</Text>
                        <Input isReadOnly={isEditMode} variant="flushed" placeholder="" size="xl" w="30%" value={purpose} onChange={onChangePurpose}/>
                        <Spacer/>
                        <Text mr={5} color="gray.500">ポイント名 :</Text>
                        <Input isReadOnly={isEditMode} variant="flushed" placeholder="" size="xl" w="30%" value={dive_point_name} onChange={onChangeDive_point_name}/>
                    </Flex>
                    <Flex>
                        <Text  mr={5} color="gray.500">潜水開始時間 :</Text>
                        <Input isReadOnly={isEditMode} type="time" mr="5" variant="flushed" placeholder="" size="xl" w="11%" value={dive_start_time} onChange={onChangeDive_start_time}/>
                        <Text color="gray.500"> ➡ </Text>
                        <Text ml="5" mr={5} color="gray.500">潜水終了時間 :</Text>
                        <Input isReadOnly={isEditMode} type="time" variant="flushed" placeholder="" size="xl" w="11%" value={dive_end_time} onChange={onChangeDive_end_time}/>
                        <Spacer/>
                        <Text color="gray.500">潜水時間 :</Text>
                        <Input isReadOnly={isEditMode} variant="flushed" placeholder="" size="xl" w="3%" value={dive_time} onChange={onChangeDive_time}/>
                        <Text color="gray.500">min</Text>
                    </Flex>
                    <Flex>
                        <Stack spacing={5} direction="row">
                            <Center w="20%">
                                <Text color="gray.500">水深</Text>
                            </Center>
                            <Box>
                                <Flex mt={{base:4, md:3}}>
                                    <Text color="gray.500" mr="5">最大 : </Text>
                                    <Input isReadOnly={isEditMode} variant="flushed" placeholder="" size="xl" w="20%" value={maxi_depth} onChange={onChangeMaxi_depth}/><Text color="gray.500">m</Text>
                                </Flex>
                                <Flex mt={{base:4, md:3}}>
                                    <Text color="gray.500" mr="5">平均 : </Text>
                                    <Input isReadOnly={isEditMode} variant="flushed" placeholder="" size="xl" w="20%" value={age_depth} onChange={onChangeAge_depth}/><Text color="gray.500">m</Text>
                                </Flex>
                            </Box>
                    
                            <Center w="30%">
                                <Text color="gray.500">タンク圧力</Text>
                            </Center>
                            <Box>
                                <Flex mt={{base:4, md:3}}>
                                    <Text color="gray.500" mr="5">開始 : </Text>
                                    <Input isReadOnly={isEditMode} variant="flushed" placeholder="" size="xl" w="20%" value={tank_start_pressure} onChange={onChangeTank_start_pressure}/><Text color="gray.500">kg/cm</Text>
                                </Flex>
                                <Flex mt={{base:4, md:3}}>
                                    <Text color="gray.500" mr="5">終了 : </Text>
                                    <Input isReadOnly={isEditMode} variant="flushed" placeholder="" size="xl" w="20%" value={tank_end_pressure} onChange={onChangeTank_end_pressure}/><Text color="gray.500">kg/cm</Text>
                                </Flex>
                            </Box>
                        </Stack>
                    </Flex>
                    <Flex>
                        <Text  mr={5} color="gray.500">水温 (水面) :</Text>
                        <Input isReadOnly={isEditMode} variant="flushed" placeholder="" size="xl" w="10%" value={water_temp_surface} onChange={onChangeWater_temp_surface}/><Text mr={20} color="gray.500">℃</Text>
                        <Text mr={5} color="gray.500">水温 (水底) :</Text>
                        <Input isReadOnly={isEditMode} variant="flushed" placeholder="" size="xl" w="10%" value={water_temp_bottom} onChange={onChangeWater_temp_bottom}/><Text color="gray.500">℃</Text>
                    </Flex>
                    <Flex>
                        <Text mr={10} color="gray.500">天気 :</Text>
                        <RadioGroup color="gray.500" value={weather}>
                            <Stack  spacing={5} direction="row">
                                <Radio isReadOnly={isEditMode} colorScheme="orange" value="1" onChange={onChangeWeather}><Icon as={BsFillSunFill} color="orange.300" w={8} h={8}/></Radio>
                                <Radio isReadOnly={isEditMode} colorScheme="gray" value="2" onChange={onChangeWeather}><Icon as={BsFillCloudFill} color="gray.400" w={8} h={8}/></Radio>
                                <Radio isReadOnly={isEditMode} colorScheme="blue" value="3" onChange={onChangeWeather}><Icon as={BsFillCloudRainFill} color="blue.400" w={8} h={8}/></Radio>
                                <Radio isReadOnly={isEditMode} colorScheme="yellow" value="4" onChange={onChangeWeather}><Icon as={BsCloudSnow} color="gray.400" w={8} h={8}/></Radio>
                            </Stack>
                        </RadioGroup>
                    </Flex>
                    <Flex>
                        <Text mr={5} color="gray.500">風向き :</Text>
                        <Input isReadOnly={isEditMode} variant="flushed" placeholder="" size="xl" w="30%" mr={20} value={wind} onChange={onChangeWind}/>
                        <Flex h="5">
                            <Text mr={5} color="gray.500">海況レベル :</Text>
                            <Select isDisabled={isEditMode} w="100" h="7" color="gray.500" variant="flushed" value={sea_level} onChange={onChangeSea_level}>
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
                            <RadioGroup isReadOnly color="gray.500" value={around_the_tide}>
                                <Stack spacing={5} direction="row">
                                    <Radio isReadOnly={isEditMode} colorScheme="orange" value="1" onChange={onChangeAround_the_tide}>大潮</Radio>
                                    <Radio isReadOnly={isEditMode} colorScheme="orange" value="2" onChange={onChangeAround_the_tide}>中潮</Radio>
                                    <Radio isReadOnly={isEditMode} colorScheme="orange" value="3" onChange={onChangeAround_the_tide}>小潮</Radio>
                                    <Radio isReadOnly={isEditMode} colorScheme="orange" value="4" onChange={onChangeAround_the_tide}>長潮</Radio>
                                    <Radio isReadOnly={isEditMode} colorScheme="orange" value="5" onChange={onChangeAround_the_tide}>若潮</Radio>
                                </Stack>
                            </RadioGroup>
                        </Stack>
                    </Flex>
                    <Flex>
                        <Text  mr={5} color="gray.500">満潮 :</Text>
                        <Input isReadOnly={isEditMode} type="time" mr="5" variant="flushed" placeholder="" size="xl" w="11%" value={high_tide} onChange={onChangeHigh_tide}/>
                        <Text ml="20" mr={5} color="gray.500">干潮 :</Text>
                        <Input isReadOnly={isEditMode} type="time" variant="flushed" placeholder="" size="xl" w="11%" value={low_tide} onChange={onChangeLow_tide}/>
                    </Flex>
                    <Flex>
                        <Stack w="100%" direction="row">
                            <Center>
                                <Text color="gray.500">スーツ</Text>
                            </Center>
                            <Center w="20%">
                                <RadioGroup color="gray.500" value={suit}>
                                    <Stack spacing={10}>
                                        <Radio isReadOnly={isEditMode} colorScheme="orange" value="1" onChange={onChangeSuit}>ウェット</Radio>
                                        <Radio isReadOnly={isEditMode} colorScheme="orange" value="2" onChange={onChangeSuit}>ドライ</Radio>
                                    </Stack>
                                </RadioGroup>
                            </Center>
                            <Center>
                                <RadioGroup color="gray.500" value={suit_thickness} >
                                    <Stack>
                                        <Radio isReadOnly={isEditMode} colorScheme="orange" value="1" onChange={onChangeSuit_thickness}>3mm</Radio>
                                        <Radio isReadOnly={isEditMode} colorScheme="orange" value="2" onChange={onChangeSuit_thickness}>3.5mm</Radio>
                                        <Radio isReadOnly={isEditMode} colorScheme="orange" value="3" onChange={onChangeSuit_thickness}>5mm</Radio>
                                        <Radio isReadOnly={isEditMode} colorScheme="orange" value="4" onChange={onChangeSuit_thickness}>6.5mm</Radio>
                                    </Stack>
                                </RadioGroup>
                            </Center>
                            <Center w="60%">
                                <Stack spacing={8} ml="170">
                                    <Flex>
                                        <Text mr={5} color="gray.500">透明度 : </Text>
                                        <Input isReadOnly={isEditMode} variant="flushed" placeholder="" size="xl" w="50%" value={water_transparency} onChange={onChangeWater_transparency}/><Text color="gray.500">m</Text>
                                    </Flex>
                                    <Flex>
                                        <Text mr={5} color="gray.500">気分 : </Text>
                                        <RadioGroup color="gray.500" value={mood}>
                                        <Stack>
                                            <Stack spacing={5} direction="row">
                                                <Radio isReadOnly={isEditMode} colorScheme="orange" value="1" onChange={onChangeMood}><Icon as={BsEmojiLaughing} color="orange.500"  w={8} h={8}/></Radio>
                                                <Radio isReadOnly={isEditMode} colorScheme="orange" value="2" onChange={onChangeMood}><Icon as={BsEmojiExpressionless} color="blue.500"  w={8} h={8}/></Radio>
                                            </Stack>
                                            <Stack spacing={5} direction="row">
                                                <Radio isReadOnly={isEditMode} colorScheme="orange" value="3" onChange={onChangeMood}><Icon as={BsEmojiAngry} color="red.600" w={8} h={8}/></Radio>
                                                <Radio isReadOnly={isEditMode} colorScheme="orange" value="4" onChange={onChangeMood}><Icon as={BsEmojiDizzy} color="purple.500" w={8} h={8}/></Radio>
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
                                    <Text  mr={5} color="gray.500">ウエイト :</Text>
                                    <Input isReadOnly={isEditMode} variant="flushed" placeholder="" size="xl" w="30%" value={weight} onChange={onChangeWeight}/><Text color="gray.500" >kg</Text>
                                </Flex>
                                <Flex>
                                    <Text mr={5} color="gray.500">アンクル :</Text>
                                    <Input isReadOnly={isEditMode} variant="flushed" placeholder="" size="xl" w="30%" value={uncle} onChange={onChangeUncle}/><Text color="gray.500" >kg</Text>
                                </Flex>
                            </Stack>
                        </Box>
                        <Flex w="80%">
                            <Box>
                                <Text  mr={5} color="gray.500">タンク :</Text>
                            </Box>
                            <RadioGroup color="gray.500" value={tank_type}>
                                <Stack>
                                    <Radio isReadOnly={isEditMode} colorScheme="orange" value="1" onChange={onChangeTank_type}>スチール</Radio>
                                    <Radio isReadOnly={isEditMode} colorScheme="orange" value="2" onChange={onChangeTank_type}>アルミ</Radio>
                                    <Radio isReadOnly={isEditMode} colorScheme="orange" value="3" onChange={onChangeTank_type}>ナイトロックス</Radio>
                                </Stack>
                            </RadioGroup>
                            <Center>
                                <Input isReadOnly={isEditMode} variant="flushed" placeholder="" size="xl" w="30%" value={tank_liter} onChange={onChangeTank_liter}/><Text color="gray.500">㍑</Text>
                            </Center>
                        </Flex>
                    </Flex>
                    <Flex>
                        <Textarea isReadOnly={isEditMode} placeholder="備 考" value={remarks} onChange={onChangeRemarks}/>
                    </Flex>
                    <Box>
                        <Stack spacing={5}>
                            <Flex>
                                <Text  mr={5} color="gray.500">バディーサイン :</Text>
                                <Input isReadOnly={isEditMode} variant="flushed" placeholder="" size="xl" w="70%" value={buddy_sign} onChange={onChangeBuddy_sign}/>
                            </Flex>
                            <Flex>
                                <Text  mr={5} color="gray.500">インストラクターサイン :</Text>
                                <Input isReadOnly={isEditMode} variant="flushed" placeholder="" size="xl" w="60%" value={instructor_sign} onChange={onChangeInstructor_sign}/>
                            </Flex>
                            <Image src={img} fallbackSrc="https://via.placeholder.com/150" alt="topPic" borderRadius="full" boxSize="200" shadow="dark-lg"/>
                        </Stack>
                    </Box>
                </Stack>
                </Scrollbar>
                </ModalBody>
                {!isEditMode && (
                <ModalFooter>
                    <Button 
                        mr="20" 
                        bg="orange.400" 
                        colorScheme="orange" 
                        size="md" 
                        // isDisabled={
                        //     (num_of_dives === 0 || !Number.isInteger(num_of_dives)) ||
                        //     (dive_date === "") ||
                        //     (dive_spots === "") ||
                        //     (dive_start_time === "") ||
                        //     (dive_end_time === "") ||
                        //     (dive_time === 0 || !Number.isInteger(dive_time)) ||
                        //     (maxi_depth === 0 || !Number.isInteger(maxi_depth)) ||
                        //     (age_depth === 0 || !Number.isInteger(age_depth)) ||
                        //     (tank_start_pressure === 0 || !Number.isInteger(tank_start_pressure)) ||
                        //     (tank_end_pressure === 0 || !Number.isInteger(tank_end_pressure)) ||
                        //     (weight === 0 || !Number.isInteger(weight)) ||
                        //     (instructor_sign === "")
                        // }
                    onClick={logUpdate}>
                        登　録
                    </Button>
                </ModalFooter>
            )}
              </ModalContent>
            </Modal>
        
        
        </>
    );

});