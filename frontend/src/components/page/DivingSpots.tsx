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
import { DivingSpotsCard } from "../atoms/DivingSpotsCard"; // 上記のProfileCardをインポート

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const japanCenter = { lat: 36.2048, lng: 138.2529 }; // 日本の中心に近い緯度経度

const testData = [
    {
        spotId: 1,
        divingSpotsName: "魔王の宮殿",
        eria: "沖縄県(宮古島)",
        explanation: "宮古島を代表する地形ダイビングスポットといえば、魔王の宮殿！といわれるぐらい地形好きの人にはたまらないおすすめのベストスポットです。いくつかのホールに分かれていて、時期は違えど全てのホールに天から差し込む光が幻想的です。天気や気候によって差し込む光の感じが見るたびに違って見えるのも、魅力の一つです。こちら全てのホールは全て通路で繋がっていて、まずは水深１５ｍ～１８ｍの縦穴から宮殿のエントランスに入っていきます。真っ暗な暗闇の中を突き進んでいくと、ここには光が多く降り注ぐメインテラスと呼ばれる場所にたどり着きます。ここからさらに暗闇の中を進んでいくと寝室と呼ばれる場所があります。そして、更に洞窟内部を探索し、最後に訪れる場所こそが玉座といわれるポイントなのですが、このダイビングポイントこそが【魔王の宮殿】の由来ともなった岩があるポイントです。",
        level: "中級",
        waterDepth: "18m〜25m",
        img: "/images/divingSpots/No1_maounokyuuden.jpeg",
        video:"/video/No1_maounokyuuden.mp4",
        location: { lat: 24.7591, lng: 125.2821 } // 宮古島の中心部
    },
    {
        spotId: 2,
        divingSpotsName: "アントニオガウディ",
        eria: "沖縄県(宮古島)",
        explanation: "地形ポイントの多い宮古島の中でも３大人気を誇る【アントニオガウディ】。この名前、皆さんもご存知かと思います。そうです。かの有名なサクラダファミリアなどの世界遺産を手がけた作者から名前をもらったのがポイント。由来として、見上げる場所により穴の形が変わることから建築家・アントニガウディの名が付けられたとのことです。地形マニアのみなさん、ここは外せませんよ！その形状はというと、まさに未完成の芸術アートのように複雑なアーチが重なっていて、一度ではその全容を把握することは難しいダイビングスポットです。",
        level: "上級",
        waterDepth: "25m〜35m",
        img: "/images/divingSpots/No2_antoniogaudey.jpg",
        video:"/video/No2_antoniogaudey.mp4",
        location: { lat: 24.7589, lng: 125.2728 } // 宮古島の中心部近く
    },
    {
        spotId: 3,
        divingSpotsName: "通り池",
        eria: "沖縄県(宮古島)",
        explanation: "通り池は最難関とよばれるダイビングスポットで、こちらのスポットは地形ダイビングの中でもトップ３に入るほどの難関スポットで正直難易度は高いです。その理由として通り池のみどころポイントとして巨大なトンネルなのですが、外洋から通り池へは、この巨大な海底トンネルを通って進入していきます。しばらく続く洞窟の天井は水深23mほど。そこをくぐって今度は水面までゆっくりと浮上していきます。つまり、巨大な洞窟に足を踏み入れると、そこはもう足の着く場所がないということです。そのため、通り池の体験ダイビングをご希望の方は事前にガイドやインストラクターにご確認して頂き、攻略法など細かく教えてもらっておくといいでしょう。そして、ここでの最大のみどころポイントとして、『サーモクライン』と呼ばれる水温の違う水が接してできる境界面があるのですが、水面へ浮上する際に、そのグラデーションの中を進んでいくので、水の色合いが変わる幻想的な世界を体感できます。",
        level: "上級",
        waterDepth: "25m",
        video:"/video/No3_tooriike.mp4",
        img: "/images/divingSpots/No3_tooriike.jpg",
        
        location: { lat: 24.7688, lng: 125.2736 } // 通り池の位置
    },
    {
        spotId: 4,
        divingSpotsName: "ワープホール",
        eria: "沖縄県(宮古島)",
        explanation: "頭上閉塞環境(洞窟)が約30mほど続く。水中ライトの明かりを頼りに洞窟内を進んだその先に見える出口からの【青さ】がとてもキレイ。まさに冒険をしてる感覚。出入り口がかなり手狭なので、壁面に頭やシリンダーをあてないよう細心の注意が必要です。水中ライトの明かりのを頼りに進んでいると、暗闇に映し出されるアカマツカサやカノコイセエビの姿に大興奮。メインスポットの洞窟を抜けた後は、棚を上をのんびり浅瀬に向かいながらフィッシュウオッチング。ハタタテハゼやクロユリハゼ・カエルウオなど、写真映えする個体が沢山見られます。",
        level: "上級",
        waterDepth: "18m〜30m",
        img: "/images/divingSpots/No4_warpFall.jpg",
        video:"/video/No4_warpFall.mp4",
        location: { lat: 24.7625, lng: 125.2852 } // 宮古島の中心部近く
    },
    {
        spotId: 5,
        divingSpotsName: "サシバ下",
        eria: "沖縄県(宮古島)",
        explanation: "長いロングリーフ沿いのスポット。水深5mほどの棚の上には、黄・青・白黒等カラフルなスズメダイ科、チョウチョウウオ科の魚をはじめ、ダイバーのアイドル【カクレクマノミ】の姿もあり、初心者のかたも安心して潜れます外洋に面し、潮通しがいいのでタカサゴ・クマザサハナムロやイソマグロの群れなども回遊してきます。",
        level: "初級",
        waterDepth: "7m〜18m",
        img: "/images/divingSpots/No5_sasibasita.jpg",
        video:"/video/No5_sasibasita.mp4",
        location: { lat: 24.7595, lng: 125.2751 } // 宮古島のロングリーフ近く
    },
    {
        spotId: 6,
        divingSpotsName: "万座ドリームホール",
        eria: "沖縄県(本島)",
        explanation: "万座エリアで最も人気のあるドリームホール。長さ30m以上のトンネルを抜けると、突き当りから差し込む光がまるでスポットライトのように幻想的な景色を演出します。洞窟内には、リュウキュウハタンポやカノコイセエビが生息しており、ライトがなければ真っ暗な洞窟探検が楽しめます。ホールを抜けると青い海が広がり、バラエティ豊かな海洋生物が待っています。",
        level: "中級",
        waterDepth: "5m〜30m",
        img: "/images/divingSpots/No6_manzaDreamHole.jpg",
        video:"/video/No6_manzaDreamHole.mp4",
        location: { lat: 26.3100, lng: 127.8284 } // 万座ドリームホールの位置
    },
    {
        spotId: 7,
        divingSpotsName: "マンタスクランブル",
        eria: "沖縄県(石垣島)",
        explanation: "石垣島の代名詞とも言えるダイビングスポット。マンタとの遭遇率が非常に高く、特に夏場はその確率がアップします。水深10m〜30mの場所に広がるサンゴ礁と砂地が特徴で、ダイバーが静かに潜ることでマンタが近くに寄ってきてくれることも。マンタのダンスを見ながらのダイビングは圧巻で、ファンダイバーからの人気が絶えません。",
        level: "中級",
        waterDepth: "10m〜30m",
        img: "/images/divingSpots/No7_mantaScramble.jpeg",
        video:"/video/No7_mantaScramble.mp4",
        location: { lat: 24.3830, lng: 124.1667 } // 石垣島のマンタスクランブル
    },
    {
        spotId: 8,
        divingSpotsName: "喜界島のスミレエビ洞窟",
        eria: "鹿児島県(奄美大島)",
        explanation: "奄美大島の喜界島エリアには、スミレエビが生息する洞窟があり、カラフルなエビを見ることができます。洞窟内は透明度が高く、光が差し込むことで洞窟全体が美しいブルーに染まります。ウミウシやカサゴなどの小さな生物も見つけやすく、写真撮影が好きなダイバーにおすすめのスポットです。",
        level: "中級",
        waterDepth: "15m〜30m",
        img: "/images/divingSpots/No8_sumirebiCave.jpg",
        video:"/video/No8_sumirebiCave.mp4",
        location: { lat: 28.0752, lng: 129.2355 } // 喜界島のスミレエビ洞窟
    },
    {
        spotId: 9,
        divingSpotsName: "雲見",
        eria: "静岡県(西伊豆)",
        explanation: "雲見は、ダイナミックな水中地形が楽しめるダイビングスポットとして有名です。複雑な岩の間をくぐり抜けると、アーチやトンネルが広がり、時には大物の魚に出会えることもあります。透明度が高く、浅瀬ではカラフルな魚たちが見られるため、地形ダイビングとフィッシュウォッチングの両方が楽しめます。初心者から上級者まで幅広く楽しめるスポットです。",
        level: "中級",
        waterDepth: "5m〜25m",
        img: "/images/divingSpots/No9_kumomi.jpg",
        video:"/video/No9_kumomi.mp4",
        location: { lat: 34.7043, lng: 138.8232 } // 雲見
    },
    {
        spotId: 10,
        divingSpotsName: "神子元島",
        eria: "東京都(伊豆諸島)",
        explanation: "神子元島は、ハンマーヘッドシャークの群れが見られることで世界的に有名なダイビングスポットです。潮流が強いため、上級者向けのポイントですが、夏から秋にかけては多くのダイバーがこのスポットを訪れます。ハンマーだけでなく、回遊魚の群れや大物の魚たちにも出会えるチャンスがあり、エキサイティングなダイビングが楽しめます。",
        level: "上級",
        waterDepth: "10m〜40m",
        img: "/images/divingSpots/No10_mikomoto.jpg",
        video:"/video/No10_mikomoto.mp4",
        location: { lat: 34.7815, lng: 139.1142 } // 神子元島
    },
    {
        spotId: 11,
        divingSpotsName: "八丈島",
        eria: "東京都(八丈島)",
        explanation: "八丈島は、東京都心からアクセスしやすく、豊かな海洋生物が生息するダイビングスポットとして人気です。ウミガメやイルカとの遭遇率が高く、また、サンゴ礁やソフトコーラルが広がる美しい海中景観が魅力です。初心者から上級者まで幅広いレベルのダイバーが楽しめるポイントが多数あります。",
        level: "中級",
        waterDepth: "5m〜30m",
        img: "/images/divingSpots/No11_hachijojima.jpg",
        video:"/video/No5_sasibasita.mp4",
        location: { lat: 33.1150, lng: 139.7845 } // 八丈島
    }
];

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

export const DivingSpots: VFC = memo(() => {

    const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const [selectedSpot, setSelectedSpot] = useState(null); // 選択されたスポットの状態
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleMarkerClick = useCallback((spot) => {
        setSelectedSpot(spot);
        onOpen(); // モーダルを開く
    }, [onOpen]);

    return (
        <>
            <Box w="100vw" h="90vh" backgroundImage={`url(${companyIcon})`} // 背景画像にGIFを設定
                backgroundSize="cover" // 背景画像がBox全体にフィットするように設定
                backgroundPosition="center" // 背景画像を中央に配置
                display="flex"
                justifyContent="center" // 水平方向に中央揃え
                alignItems="center" // 垂直方向に中央揃え
                p={10}
            >
                <Box
                    m="auto"
                    pt={10}
                    maxW="100%"
                    w="8xl"
                    // h={{ base: "md", sm: "sm", md: "xl", lg: "2xl", "2xl": "3xl" }}
                    h="80vh"
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
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        style={{ width: "100%", height: "100%" }}
                    >

                        {/* ここに地図を表示する */}

                        <Box bg="white" p={3} w="100%" h="50vh" borderRadius="lg">
                            <LoadScript googleMapsApiKey={googleMapsApiKey}>
                                <GoogleMap
                                    mapContainerStyle={{ width: "100%", height: "100%" }}
                                    center={japanCenter}
                                    zoom={4} // 日本全体を表示するためのズームレベル
                                >
                                    {testData.map((spot) => (
                                    <Marker
                                        key={spot.spotId}
                                        position={spot.location}
                                        label={spot.divingSpotsName}
                                        onClick={() => handleMarkerClick(spot)}
                                    />
                        ))}
                                </GoogleMap>
                            </LoadScript>
                        </Box>

                        {/* 地図終了 ---  */}

                        <SimpleGrid columns={{ base: 1, sm: 3, md: 3, lg: 3 }} spacing={10} p={5}>
                        {testData.map((data, index) => (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ duration: 0.5 }}
                            >
                                <DivingSpotsCard
                                    divingSpotsName={data.divingSpotsName}
                                    eria={data.eria}
                                    explanation={data.explanation}
                                    level={data.level}
                                    waterDepth={data.waterDepth}
                                    img={data.img}
                                    location={data.location}
                                    video={data.video}
                                />
                            </motion.div>
                        ))}
                        </SimpleGrid>
                    </motion.div>
                </Box>

            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent bg="white">
                        <ModalHeader>{selectedSpot?.divingSpotsName}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Image
                                src={selectedSpot?.img}
                                alt={selectedSpot?.divingSpotsName}
                                borderRadius="md"
                                mb={4}
                            />
                            <Text><strong>エリア:</strong> {selectedSpot?.eria}</Text>
                            <Text mt={2}><strong>説明:</strong> {selectedSpot?.explanation}</Text>
                            <Text mt={2}><strong>レベル:</strong> {selectedSpot?.level}</Text>
                            <Text mt={2}><strong>水深:</strong> {selectedSpot?.waterDepth}</Text>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                                閉じる
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

        </>

    );
});
