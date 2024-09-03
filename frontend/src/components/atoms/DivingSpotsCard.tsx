import { VFC, useCallback, memo, useEffect, useState } from "react";
import {
  Box, Image, Stack, Heading, Text, Divider, Button, ButtonGroup, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  ModalBody,
  ModalCloseButton
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { GiRibbonMedal } from "react-icons/gi";
import { GiStarMedal } from "react-icons/gi";
import { RiMedalFill } from "react-icons/ri";
import { IoIosMedal } from "react-icons/io";
import { IoMedal } from "react-icons/io5";
import { GiMedal } from "react-icons/gi";
import { useMessage } from "../../hooks/useMessage";
import { useGetAccountList } from "../../hooks/useGetAccountList"
import axiosInstance from "../../api/axiosInstance";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";


interface DivingSpotsCardProps {
  divingSpotsName: string;
  eria: string;
  explanation: string;
  level: string;
  waterDepth: string;
  img: string;
  video:string;
  location:google.maps.LatLngLiteral;
}

// 初期表示する場所の座標
// const center = {
//   lat: 24.8043,  // 東京の緯度
//   lng: 125.1681, // 東京の経度
// };


export const DivingSpotsCard: VFC<DivingSpotsCardProps> = memo(({
  divingSpotsName,
  eria,
  explanation,
  level,
  waterDepth,
  img,
  video,
  location
}) => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleMouseOver: React.MouseEventHandler<HTMLVideoElement> = (e) => {
    const videoElement = e.currentTarget;
    videoElement.play(); // ホバー時に動画を再生
  };

  const handleMouseOut: React.MouseEventHandler<HTMLVideoElement> = (e) => {
    const videoElement = e.currentTarget;
    videoElement.pause(); // ホバーが外れたら停止
    videoElement.currentTime = 0; // 動画を最初に戻す
  };


  return (
    <>
      <Box
        maxW="md"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg="white"
        shadow="md"
      >
      <video
          src={video} // 動画のURLを指定
          width="100%"
          height="250px"
          style={{ objectFit: 'cover' }}
          controls={false}
          muted
          loop
          onMouseOver={handleMouseOver} // ホバー時に再生
          onMouseOut={handleMouseOut} // ホバーが外れたら停止
        />
        <Stack mt="6" spacing="3" p="4" h="100%">
          <Heading size="md">{divingSpotsName}</Heading>
          <Box
            h="200px" // 高さを指定してスクロールを制御
            overflowY="auto"
          >
            <Text>
              {explanation}
            </Text>
          </Box>
          <Text color="blue.600" fontSize="2xl">
            {level} - {waterDepth}
          </Text>
        </Stack>
        <Divider />
        <Box p="4">
          <Button variant="solid" colorScheme="blue" onClick={onOpen}>
            Map
          </Button>
        </Box>
      </Box>

      {/* モーダル */}
      <Modal isOpen={isOpen} onClose={onClose} size="5xl" >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="white">{divingSpotsName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody bg="white" p={3}>
          <LoadScript googleMapsApiKey="AIzaSyCt9M8o67qHXrLqbR_pSNwEKp7EW7ycOyw">
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "70vh" }}
              center={location}
              zoom={10} // 地図のズームレベル
            >
              <Marker position={location} />
            </GoogleMap>
          </LoadScript>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
});





